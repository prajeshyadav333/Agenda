import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/analytics', async (_req, res) => {

  try {

    // users collection
    const usersCollection =
      mongoose.connection.collection('users');

    // attempts collection
    const attemptsCollection =
      mongoose.connection.collection('attempts');

    // count users
    const users =
      await usersCollection.countDocuments();

    // count tests attempted
    const activeTests =
      await attemptsCollection.countDocuments();
const completedTests =
  await attemptsCollection.countDocuments({
    completed: true
  });
  
    res.json({
      users,
      activeTests,
     avgAccuracy: completedTests
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.get('/distribution', async (_req, res) => {

  try {

    const usersCollection =
      mongoose.connection.collection('users');

    const students =
      await usersCollection.countDocuments({
        role: 'student'
      });

    const teachers =
      await usersCollection.countDocuments({
        role: 'teacher'
      });

    const admins =
      await usersCollection.countDocuments({
        role: 'admin'
      });

    res.json([
      {
        name: 'Students',
        value: students
      },
      {
        name: 'Teachers',
        value: teachers
      },
      {
        name: 'Admins',
        value: admins
      }
    ]);

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get('/performance', async (_req, res) => {

  try {

    const attemptsCollection =
      mongoose.connection.collection('attempts');

    const totalTests =
      await attemptsCollection.countDocuments();

    const completedTests =
      await attemptsCollection.countDocuments({
        completed: true
      });

    res.json([
      {
        week: 'Tests',
        taken: totalTests,
        completed: completedTests
      }
    ]);

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    });

  }

});

export default router;