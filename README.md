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

(Add Screenshot)

### Register

(Add Screenshot)

### Home

(Add Screenshot)

### Song Upload

(Add Screenshot)

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
