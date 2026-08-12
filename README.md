Agentic Adaptive Learning System

An AI-powered web-based learning platform that provides personalized and adaptive learning by analyzing student performance and dynamically generating assessments.

📌 Project Overview

The Agentic Adaptive Learning System is designed to overcome the limitations of traditional one-size-fits-all learning platforms.

The system allows teachers to upload learning materials and create courses, while students can study the materials and take AI-generated quizzes. Based on the student's performance, the system adapts the difficulty of subsequent questions and provides performance analytics.

The project uses Large Language Models (LLMs) through the Groq API to generate educational questions from learning content.

🎯 Objectives

- Provide personalized learning experiences for students.
- Automatically generate quiz questions from uploaded materials.
- Adapt question difficulty based on student performance.
- Reduce the manual effort required for creating assessments.
- Track student performance and quiz results.
- Provide separate interfaces for Students, Teachers, and Administrators.
- Store and manage application data using MongoDB.

✨ Key Features

👨‍🎓 Student Module

- Student registration and login.
- Access assigned courses and learning materials.
- Attempt dynamically generated quizzes.
- Receive questions based on current performance.
- Track quiz results and learning progress.

👨‍🏫 Teacher Module

- Create and manage courses.
- Upload learning materials.
- Create and manage assessments.
- Monitor student performance.

👨‍💼 Admin Module

- Manage users and system data.
- Monitor courses and assessments.
- View overall system analytics.

🤖 AI-Based Features

- AI-assisted question generation.
- Generation of questions from uploaded educational content.
- Adaptive question difficulty.
- Performance-based learning flow.

🔄 Adaptive Learning Workflow

Learning Material
       ↓
Content Processing
       ↓
Groq API + LLM
       ↓
Quiz Question Generation
       ↓
Student Attempts Question
       ↓
Performance Evaluation
       ↓
Difficulty Adjustment
       ↓
Next Question

🏗️ Technology Stack

Frontend

- React
- TypeScript
- Tailwind CSS
- Vite
- Recharts

Backend

- Node.js
- Express.js
- TypeScript
- REST APIs

Database

- MongoDB
- Mongoose

«MongoDB is configured as a local database in this project; MongoDB Atlas is not required.»

AI

- Groq API
- Large Language Model (LLM) for AI-based question generation

Authentication & Security

- JWT (JSON Web Tokens)
- bcrypt.js for password hashing

🧩 System Architecture

The system follows a client-server architecture:

User
 │
 ▼
React + TypeScript Frontend
 │
 ▼
Express.js REST API
 │
 ├──────────────► MongoDB
 │
 └──────────────► Groq API
                       │
                       ▼
                    LLM
                       │
                       ▼
               Generated Questions

🛠️ Installation and Setup

1. Clone the Repository

git clone <YOUR-GITHUB-REPOSITORY-URL>
cd <PROJECT-FOLDER>

2. Install Frontend Dependencies

cd frontend
npm install

3. Install Backend Dependencies

cd ../backend
npm install

4. Configure Environment Variables

Create a ".env" file in the backend directory and add the required configuration.

Example:

PORT=4000
DB_URL=mongodb://127.0.0.1:27017/ailearning
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret

Do not upload API keys or passwords to GitHub.

5. Start MongoDB

Make sure the locally installed MongoDB service is running.

The project uses the database:

ailearning

6. Start the Backend

cd backend
npm run dev

The backend API runs on:

http://localhost:4000

7. Start the Frontend

Open another terminal:

cd frontend
npm run dev

Vite will provide the local development URL, usually:

http://localhost:5173

📊 Adaptive Question Mechanism

The system evaluates the student's submitted answer and determines whether it is correct.

The performance information is then used to influence the difficulty of the next question.

A simplified flow is:

Correct Answer
      ↓
Increase / Maintain Difficulty
      ↓
Next Question

Incorrect Answer
      ↓
Reduce / Maintain Difficulty
      ↓
Next Question

The project uses Bloom's Taxonomy and performance-based rules as part of the adaptive learning approach.

🔐 Security

The application includes:

- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based access for Student, Teacher, and Admin.
- Environment variables for sensitive configuration.
- API-based communication between frontend and backend.

📁 Main Project Structure

Agentic-Adaptive-Learning-System/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── README.md
└── .gitignore

🚀 Future Enhancements

- More advanced learner-performance prediction.
- Improved adaptive learning algorithms.
- More detailed learning analytics.
- Multilingual educational content.
- AI-based learning assistance.
- Improved emotional-state and engagement analysis.
- Mobile application support.

👥 Project Team

Project: Agentic Adaptive Learning System

Developed as an academic project by a team of students.

📚 Technologies and References

- React Documentation
- Node.js Documentation
- Express.js Documentation
- MongoDB Documentation
- Mongoose Documentation
- TypeScript Documentation
- Tailwind CSS Documentation
- Groq API Documentation
- Vite Documentation
- JWT Documentation
- Bloom's Taxonomy

---

📄 License

This project was developed for academic and educational purposes.