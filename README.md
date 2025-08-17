# 🌍 Linguify

<div align="center">
  
  ![Linguify Logo](https://img.shields.io/badge/🌍-Linguify-4F46E5?style=for-the-badge&labelColor=1F2937)
  
  **Connect • Learn • Simplify Language Learning**
  
  **React 19 • Node.js • MongoDB • TailwindCSS**
  
  🚀 **[Live Demo](https://linguify-demo.com)** • 📚 **[Documentation](https://docs.linguify.com)**

</div>

---

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **MongoDB** (local installation or cloud database)
- **Stream Account** (for chat/video features)
- **Git** (for cloning the repository)

### Getting Stream API Keys
1. Sign up at [GetStream.io](https://getstream.io/)
2. Create a new Linguify app in your dashboard
3. Copy your API key and secret from the app settings
4. Add them to your environment variables

---

## ⚙️ Configuration

### Environment Variables Explained

**Backend Configuration:**
- `MONGO_URI`: Your MongoDB connection string
- `STREAM_API_KEY`: Stream API key for real-time features
- `STREAM_API_SECRET`: Stream API secret (keep secure)
- `JWT_SECRET_KEY`: Random string for JWT token signing
- `PORT`: Server port (default: 5001)

**Frontend Configuration:**
- `VITE_STREAM_API_KEY`: Same as backend Stream API key
- `VITE_API_BASE_URL`: Backend API URL (optional)

---

## ✨ What is Linguify?

Linguify is a **modern language exchange platform** that connects language learners worldwide through real-time chat and video calls. Find your perfect language partner, practice conversations, and accelerate your language learning journey.

---

## 🚀 Key Features

<table>
<tr>
<td width="50%">

### 🌐 **Global Community**
- Connect with language learners worldwide
- Smart matching by languages & interests
- Build your international friend network

### 💬 **Real-time Chat**
- Instant messaging with typing indicators
- Emoji reactions & rich media sharing
- Group conversations & language rooms

</td>
<td width="50%">

### 📹 **Video Conversations**
- HD quality face-to-face video calls
- Practice speaking with native speakers
- Screen sharing for collaborative learning

### 👥 **Friend System**
- Send & receive friend requests
- Discover compatible language partners
- Track your learning journey together

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| React 19 | Node.js | MongoDB | Vite |
| TailwindCSS | Express | Mongoose | Stream SDK |
| DaisyUI | JWT Auth | - | TanStack Query |
| Zustand | Bcrypt | - | Framer Motion |

</div>

---

## 🚀 Quick Start

### 1️⃣ **Clone & Install**
```bash
# Clone the repository
git clone https://github.com/yourusername/linguify.git
cd linguify

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies  
cd ../frontend && npm install
```

### 2️⃣ **Environment Setup**

Create `.env` files:

**Backend** (`/backend/.env`)
```env
MONGO_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret_key
```

**Frontend** (`/frontend/.env`)
```env
VITE_STREAM_API_KEY=your_stream_api_key
```

### 3️⃣ **Run the Application**
```bash
# Start backend (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)  
cd frontend && npm run dev
```

🎉 **Access at**: `http://localhost:5173`

---

## 📱 Core Pages

<div align="center">

| Page | Description | Key Features |
|------|-------------|--------------|
| 🏠 **Home** | Dashboard & friend discovery | Browse learners, quick actions |
| 👥 **Friends** | Your language learning network | Message, video call, manage connections |
| 💬 **Chat** | Real-time conversations | Text messaging, emoji reactions |
| 👤 **Profile** | Your learning identity | Languages, bio, friend requests |

</div>

---

## 🔐 Authentication Flow

### Key Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - User logout

### Authentication Method
- ✅ **httpOnly cookies** for JWT storage
- ✅ **7-day token expiration**
- ✅ **Secure password hashing** with bcrypt
- ❌ No Authorization header needed

---

## 🌐 Deployment

### **Frontend**
- Deploy to Netlify or Vercel
- Build command: `npm run build`
- Deploy the `dist` folder

### **Backend** 
- Deploy to Railway or Heroku
- Set environment variables
- Connect MongoDB database

---

## 🤝 Contributing

We love contributions! Here's how to get started:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. 💾 **Commit** your changes: `git commit -m 'Add amazing feature'`
4. 🚀 **Push** to branch: `git push origin feature/amazing-feature`
5. 🎯 **Open** a Pull Request

---

## 📞 Support & Community

- **GitHub Issues**: Report bugs and request features
- **Discord Community**: Join our language learning community
- **Email Support**: support@linguify.com

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  
  **Made with ❤️ for language learners and friendship**
  
  ⭐ **Star this repo if you found it helpful!**

</div>