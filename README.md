# 🎵 Moodify

Moodify is an AI-powered music player that detects a user's facial expression and recommends songs based on their mood. It combines AI, computer vision, and a full-stack MERN application to provide a personalized music experience.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login using Cookies

### 😊 AI Mood Detection
- Detects facial expressions using MediaPipe Face Landmarker
- Predicts moods such as:
  - 😊 Happy
  - 😢 Sad
  - 😲 Surprised

### 🎶 Music Player
- Plays songs based on detected mood
- Automatic playback of the next song
- Play / Pause controls
- Dynamic playlist support
- Fallback poster for songs without artwork

### 📤 Song Management
- Upload songs through the frontend
- Upload MP3 files
- Automatic extraction of song metadata (Title & Artist)
- Upload poster image
- Automatic fallback poster if none is provided
- Store media using ImageKit

### 🗄 Backend
- REST APIs using Express.js
- MongoDB database
- Multer for file uploads
- ImageKit Cloud Storage
- JWT Authentication
- Redis token blacklist for logout

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- Context API
- SCSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Redis
- ImageKit
- node-id3

### AI
- MediaPipe Face Landmarker

---

## 📂 Project Structure

```
Moodify
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── services
│   └── config
│
├── Frontend
│   ├── features
│   │
│   ├── auth
│   ├── home
│   ├── Expression
│   └── shared
│
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/omsalunkhe17/Moodify.git
```

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the Backend directory.

Example:

```env
PORT=3000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
IMAGEKIT_PUBLIC_KEY=YOUR_PUBLIC_KEY
IMAGEKIT_PRIVATE_KEY=YOUR_PRIVATE_KEY
IMAGEKIT_URL_ENDPOINT=YOUR_URL_ENDPOINT
REDIS_URL=YOUR_REDIS_URL
```

---

## 📸 Screenshots

### Login

(<img width="1920" height="1080" alt="Login" src="https://github.com/user-attachments/assets/cc2234f4-9d64-4ed5-ac5e-52cf6bc9e1ce" />)

### Register

(<img width="1920" height="1080" alt="Register" src="https://github.com/user-attachments/assets/7d4b8093-9f38-4b5d-8837-0cd0defca6c7" />)

### Home

(<img width="1920" height="1080" alt="Home" src="https://github.com/user-attachments/assets/d132018b-52a2-4113-996f-5f20db523b04" />)

### Song Upload

(<img width="1920" height="1080" alt="Upload" src="https://github.com/user-attachments/assets/8f995f12-089f-4d7a-ace9-fa2b2a320016" />)

### Song Playlist

(<img width="1920" height="1080" alt="Playlist" src="https://github.com/user-attachments/assets/a2ac4ab1-d6af-49c6-a732-defa5f08b4b8" />)

## Detecting Page

(<img width="1920" height="1080" alt="Detecting Home" src="https://github.com/user-attachments/assets/c06fc636-14a7-4ba2-8760-b2c3a7b2c018" />)

---

## 🛣 Future Improvements

- Playlist Management
- Favorites
- Recently Played
- Shuffle
- Repeat
- Search Songs
- Volume Control
- Dark/Light Theme
- Admin Dashboard
- Lyrics Support

---

## 👨‍💻 Author

**Om Salunkhe**

GitHub: https://github.com/omsalunkhe17

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
