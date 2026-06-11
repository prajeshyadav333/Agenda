import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Material } from '../db/models';
import { authenticateToken, requireTeacher, AuthRequest } from '../middleware/auth';

const router = Router();
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Upload material (protected - teachers only)
router.post('/upload', authenticateToken, requireTeacher, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'file required' });
    
    const teacherId = req.user!.userId;
    const materialId = `mat_${Date.now()}`;
const material = new Material({
  id: materialId,

  fileName: req.file.originalname,

  filePath: req.file.filename,

  uploadedBy: teacherId,

  classId: req.body.classId || null,

  uploadedAt: new Date()
});
    await material.save();
    
    console.log(`📁 Material uploaded by ${req.user!.username}: ${req.file.originalname}`);
    
    res.json({ 
      file: req.file.filename, 
      original: req.file.originalname,
      materialId: materialId,
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// List materials (filtered by teacher)
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    
    // Teachers see only their materials
    // Admins see all materials
    const query = role === 'admin' ? {} : { uploadedBy: userId };
    
    const materials = await Material.find(query).sort({ uploadedAt: -1 });
    
    const formattedMaterials = materials.map((m) => ({
      id: m.id,
      file: m.filePath,
      fileName: m.fileName,
      uploadedBy: m.uploadedBy,
      uploadedAt: m.uploadedAt,
    }));
    
    res.json({ materials: formattedMaterials });
  } catch (error) {
    console.error('❌ Error fetching materials:', error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

router.get(
  '/class/:classId',
  authenticateToken,
  async (req, res) => {

    try {

      const materials =
        await Material.find({
          classId: req.params.classId
        });

      res.json({
        materials
      });

    } catch (error: any) {

      res.status(500).json({
        error: error.message
      });

    }

});
export default router;
