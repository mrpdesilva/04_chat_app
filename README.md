# 💬 ChatApp

A real-time full-stack chat application built with the MERN stack and Socket.io. Features a sleek dark UI with live messaging, online presence indicators, unread message counts, and per-user persistent notifications.

![ChatApp Preview](https://img.shields.io/badge/Status-Live-22d3a0?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-6494f8?style=flat-square) ![Stack](https://img.shields.io/badge/Stack-MERN-b48cf7?style=flat-square)

---

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://zero4-chat-app-257d.onrender.com)

---

## ✨ Features

- **Real-time messaging** — instant message delivery via Socket.io
- **Online presence** — see who's online with live green indicators
- **Unread message badges** — per-user, per-conversation unread counts persisted in MongoDB
- **Last message preview** — sidebar shows the latest message for each conversation
- **Conversation sorting** — unread chats float to the top, then sorted by most recent message
- **Real-time sidebar updates** — last message and unread count update instantly without page reload
- **Close chat** — dismiss an open conversation and return to the home screen
- **User-specific notifications** — unread counts are isolated per user, accurate across browsers and sessions
- **JWT Authentication** — secure login/signup with HTTP-only cookies
- **Auto-generated avatars** — DiceBear avatars assigned on signup based on username and gender

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| Socket.io | Real-time bidirectional events |
| JWT + bcryptjs | Authentication & password hashing |
| cookie-parser | HTTP-only cookie handling |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Zustand | Global state management |
| Socket.io Client | Real-time event listening |
| Tailwind CSS + DaisyUI | Styling |
| React Hot Toast | Notifications |

---

## 📁 Project Structure

```
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── message.controller.js
│   │   ├── users.controller.js
│   │   └── unread.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   └── unread.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── messages.routes.js
│   │   ├── users.routes.js
│   │   └── unread.routes.js
│   ├── middleware/
│   │   └── protectRoute.js
│   ├── socket/
│   │   └── socket.js
│   ├── db/
│   │   └── connectToMongoDB.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── sidebar/
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── Conversations.jsx
    │   │   │   ├── Conversation.jsx
    │   │   │   ├── SearchInput.jsx
    │   │   │   └── LogoutButton.jsx
    │   │   └── messages/
    │   │       ├── MessageContainer.jsx
    │   │       ├── Messages.jsx
    │   │       ├── Message.jsx
    │   │       └── MessageInput.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── SocketContext.jsx
    │   ├── hooks/
    │   │   ├── useGetConversations.js
    │   │   ├── useGetMessages.js
    │   │   ├── useListenMessages.js
    │   │   ├── useLogout.js
    │   │   └── useSendMessage.js
    │   ├── zustand/
    │   │   └── useConversation.js
    │   └── pages/
    │       ├── home/Home.jsx
    │       ├── login/Login.jsx
    │       └── signup/SignUp.jsx
    └── index.html
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **root** of the project:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB instance

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/chatapp.git
cd chatapp
```

**2. Install backend dependencies**
```bash
npm install
```

**3. Install frontend dependencies**
```bash
npm install --prefix frontend
```

**4. Set up environment variables**
```bash
# Create .env in root directory and fill in your values
cp .env.example .env
```

### Running in Development

Run the backend and frontend as two separate processes:

```bash
# Terminal 1 — Backend (port 5000)
npm run server

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Running in Production

Build the frontend and serve everything from a single Express server:

```bash
npm run build
npm start
```

Open [http://localhost:5000](http://localhost:5000)

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Clear JWT cookie |

### Messages
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/messages/:id` | Get conversation messages |
| POST | `/api/messages/send/:id` | Send a message |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users for sidebar |
| GET | `/api/users/last-messages` | Get last message per conversation |

### Unread
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/unread` | Get all unread counts for logged-in user |
| POST | `/api/unread/clear/:fromUserId` | Mark a conversation as read |

---

## 🔄 Real-time Socket Events

| Event | Direction | Description |
|---|---|---|
| `newMessage` | Server → Receiver | Delivers a new message to open chat |
| `conversationUpdate` | Server → Both users | Updates sidebar preview and triggers unread badge |
| `getOnlineUsers` | Server → All | Broadcasts list of currently online user IDs |

---

## 📸 Screenshots

> _Add your screenshots here_

| Sign Up | Login |
|---------|-------|
| ![Signup](https://github.com/user-attachments/assets/d2033e03-7879-4b59-9288-edba35efcc62) | ![Login](https://github.com/user-attachments/assets/5fdd80db-afdd-44e0-9718-4d1640d7dc37) |

| Home | Chats |
|------|-------|
| ![Home](https://github.com/user-attachments/assets/0a8084e1-2594-46e0-937f-0b984a566e4a) | ![Chats](https://github.com/user-attachments/assets/4ad5f4e2-ad8d-40db-ac80-55aa19e92c4c) |

---

## 🧠 How Unread Counts Work

Unread counts are stored in MongoDB (`Unread` collection) keyed by `{ userId, fromUserId }`. This means:

- Counts survive **page reloads** and **browser restarts**
- Counts are **user-specific** — logging out and switching users never leaks one user's read state to another
- The `message.controller` increments the count on every send via `$inc`
- Opening a conversation calls `POST /api/unread/clear/:fromUserId` to reset it in MongoDB and Zustand simultaneously

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [DiceBear](https://www.dicebear.com/) for avatar generation
- [Socket.io](https://socket.io/) for real-time communication
- [Zustand](https://github.com/pmndrs/zustand) for lightweight state management
