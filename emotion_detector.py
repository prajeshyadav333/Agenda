import cv2
import requests
import time
from deepface import DeepFace

BACKEND_URL = "http://localhost:4000"
DETECTION_INTERVAL = 5

EMOTION_STRESS_MAP = {
    'happy': 1,
    'neutral': 3,
    'surprise': 4,
    'sad': 6,
    'disgust': 6,
    'fear': 8,
    'angry': 9,
}

def get_stress_level(emotion):
    return EMOTION_STRESS_MAP.get(emotion.lower(), 5)

def send_stress_to_backend(stress_level, emotion):
    try:
        requests.post(f"{BACKEND_URL}/api/emotion/update",
            json={"stressLevel": stress_level, "emotion": emotion}, timeout=3)
        print(f"✅ Sent stress={stress_level} emotion={emotion}")
    except:
        print("⚠️ Could not reach backend")

def analyze_emotion(frame):
    try:
        result = DeepFace.analyze(frame, actions=['emotion'],
            enforce_detection=False, silent=True)
        if isinstance(result, list):
            result = result[0]
        emotion = result['dominant_emotion']
        confidence = round(result['emotion'][emotion], 1)
        return emotion, confidence
    except:
        return 'neutral', 0

def draw_ui(frame, emotion, stress, confidence):
    h, w = frame.shape[:2]
    cv2.rectangle(frame, (0, 0), (w, 80), (20, 20, 50), -1)
    cv2.putText(frame, "Emotion Detector - Adaptive Learning",
        (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 212, 255), 2)
    color = (0,255,0) if stress<=3 else (0,165,255) if stress<=6 else (0,0,255)
    cv2.putText(frame, f"Emotion: {emotion.upper()} ({confidence}%)",
        (10, 55), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
    cv2.rectangle(frame, (0, h-50), (w, h), (20, 20, 50), -1)
    bar_w = int((stress/10)*(w-20))
    cv2.rectangle(frame, (10, h-40), (10+bar_w, h-10), color, -1)
    cv2.putText(frame, f"Stress Level: {stress}/10",
        (w//2-80, h-20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)
    return frame

print("=" * 50)
print("EMOTION DETECTION - ADAPTIVE LEARNING SYSTEM")
print("=" * 50)
print("Press Q to quit")

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Could not open webcam!")
    exit()

print("Webcam opened!")
last_time = 0
emotion = "neutral"
stress = 3
confidence = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    now = time.time()
    if now - last_time >= DETECTION_INTERVAL:
        print("Analyzing emotion...")
        emotion, confidence = analyze_emotion(frame)
        stress = get_stress_level(emotion)
        print(f"Emotion: {emotion} Stress: {stress}/10")
        send_stress_to_backend(stress, emotion)
        last_time = now
    frame = draw_ui(frame.copy(), emotion, stress, confidence)
    cv2.imshow("Emotion Detector", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print("Stopped.")