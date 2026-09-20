<div align="center">

<img src="assets/banner.svg" alt="VibeSync Banner" width="100%" />

<br />
<br />

# ⚡ VibeSync

### *Instant, Event-Driven Group Conversations with Rich Media Sharing in a Sleek Glassmorphic Interface*

[![GitHub Stars](https://img.shields.io/github/stars/kartikeyv-coder/VibeSync?style=for-the-badge&color=eab308&logo=star&logoColor=white)](https://github.com/kartikeyv-coder/VibeSync/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/kartikeyv-coder/VibeSync?style=for-the-badge&color=6366f1&logo=git&logoColor=white)](https://github.com/kartikeyv-coder/VibeSync/network/members)
[![Issues](https://img.shields.io/github/issues/kartikeyv-coder/VibeSync?style=for-the-badge&color=ef4444&logo=github)](https://github.com/kartikeyv-coder/VibeSync/issues)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.IO-4.8-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Multer](https://img.shields.io/badge/Multer-2.4-f39c12?style=for-the-badge&logo=node.js&logoColor=white)](https://github.com/expressjs/multer)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-3b82f6.svg?style=for-the-badge)](LICENSE)

<br />

```
  ____   ____.__ ___.             _________                     
  \   \ /   /|__|\_ |__   ____   /   _____/__.__. ____   ____  
   \   Y   / |  | | __ \_/ __ \  \_____  <   |  |/    \_/ ___\ 
    \     /  |  | | \_\ \  ___/  /        \___  |   |  \  \___ 
     \___/   |__| |___  /\___  >/_______  // ____|___|  /\___  >
                      \/     \/         \/ \/         \/     \/ 
```

<p align="center">
  <a href="#-the-pitch">About</a> •
  <a href="#-feature-matrix">Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-tech-stack-deep-dive">Tech Stack</a> •
  <a href="#-socket--rest-protocol-specification">Protocol Specs</a> •
  <a href="#-ui--design-system">Design System</a> •
  <a href="#-project-anatomy">Project Anatomy</a> •
  <a href="#-quick-start">Installation</a> •
  <a href="#-troubleshooting--faq">FAQ</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

---

## 💡 The Pitch

Most chat applications are either burdened by bloated databases, convoluted authentication configs, and difficult setup processes, or they look like abandoned proof-of-concept projects from 2014.

**VibeSync** strikes the perfect balance:
- **Zero Configuration Barrier**: Spin up the backend and frontend in seconds without configuring external cloud databases.
- **Microsecond WebSocket Latency**: Powered by Socket.IO rooms with lightweight in-memory user registry and strict room channel isolation.
- **Rich Media & File Sharing**: Effortlessly upload and share images, documents, and media clips with instant inline thumbnail previews.
- **Precision Timestamps**: Localized timestamp rendering on every text and media message bubble.
- **Modern Dark Glassmorphic Aesthetic**: Built using the bleeding-edge **Tailwind CSS v4** engine with dynamic backdrop filters, ambient neon accents, and fluid gradients.
- **Bulletproof Room State**: Automated presence tracking, live membership counts, duplicate username blocking, and graceful socket disconnect cleanup.

---

## ⚡ Feature Matrix

<table>
  <tr>
    <td width="50%">
      <h3>🌐 Dynamic Multi-Room Channels</h3>
      <p>Users can jump into any custom room instantly. Messages and media are scoped strictly to the room members—zero cross-talk, zero message leaks.</p>
    </td>
    <td width="50%">
      <h3>📎 Rich Media & File Sharing</h3>
      <p>Upload and distribute images and files via a dedicated Multer REST pipeline. Inline image rendering directly in chat bubbles with click-to-view links.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🕒 Precision Message Timestamps</h3>
      <p>Every message is tagged with an ISO timestamp on receipt and displayed formatted (<code>hh:mm</code>) in local time for transparent conversation flow.</p>
    </td>
    <td width="50%">
      <h3>👥 Real-Time Presence Sync</h3>
      <p>A reactive sidebar updates instantly as users join or leave, featuring an active participant counter and glowing online status indicators.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🤖 Automated System Broadcasts</h3>
      <p>Intelligent admin notifications greet users upon room entry and broadcast departures immediately to remaining participants.</p>
    </td>
    <td width="50%">
      <h3>🛡️ Duplicate Handle Defense</h3>
      <p>In-memory room validation automatically prevents multiple users in the same room from claiming identical nicknames.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📜 Smooth Smart Auto-Scroll</h3>
      <p>Utilizes <code>react-scroll-to-bottom</code> for frictionless auto-scrolling on new incoming messages while preserving manual review capabilities.</p>
    </td>
    <td width="50%">
      <h3>💎 Ultra-Polished Glass UI</h3>
      <p>Built with high-contrast slate palettes, glowing border accents, custom scrollbars, and tactile interactive button feedback.</p>
    </td>
  </tr>
</table>

---

## 🏛️ System Architecture

### High-Level Topology

```mermaid
graph TD
    subgraph Client ["Client (React 18 + Vite 8 + Tailwind v4)"]
        UI[Glassmorphic UI]
        Router[React Router v6]
        SocketClient[Socket.io-Client]
        FileUploader[Multipart Form Uploader]
        
        Router --> UI
        UI <--> SocketClient
        UI --> FileUploader
    end

    subgraph Network ["Dual Transport Network"]
        WSChannel((Bi-directional WS / WSS Stream))
        HTTPChannel((REST Multipart / Static HTTP))
    end

    subgraph Server ["Server (Node.js + Express 5 + Multer)"]
        SocketServer[Socket.IO Server Engine]
        RoomManager[In-Memory User & Room Registry]
        ExpressRouter[Express Router & CORS Gateway]
        MulterEngine[Multer File Storage Engine]
        UploadsDir[(Disk Storage /uploads)]
        
        SocketServer <--> RoomManager
        SocketServer --- ExpressRouter
        ExpressRouter --> MulterEngine
        MulterEngine --> UploadsDir
        ExpressRouter -. Static Serve .-> UploadsDir
    end

    SocketClient <====> WSChannel <====> SocketServer
    FileUploader ====> HTTPChannel ====> ExpressRouter

    classDef client fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef server fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#fff;
    classDef network fill:#020617,stroke:#34d399,stroke-width:2px,color:#fff;

    class UI,Router,SocketClient,FileUploader client;
    class SocketServer,RoomManager,ExpressRouter,MulterEngine,UploadsDir server;
    class WSChannel,HTTPChannel network;
```

---

### Media Upload & Message Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Alice as 👤 Alice (Client A)
    participant Server as ⚡ Express & Socket.IO
    participant Storage as 📁 Disk Storage (/uploads)
    actor Bob as 👤 Bob (Client B)

    rect rgb(15, 23, 42)
        Note over Alice,Bob: 1. File Upload Pipeline
        Alice->>Server: POST /upload (FormData: file)
        Server->>Storage: Store file as [timestamp]-[filename]
        Storage-->>Server: File saved successfully
        Server-->>Alice: 200 OK { filename, url }
    end

    rect rgb(20, 27, 45)
        Note over Alice,Bob: 2. Real-Time Broadcast
        Alice->>Server: emit("sendMessage", { type: "file", filename, url })
        Server->>Server: Inject timestamp & look up user
        Server-->>Alice: io.to(room).emit("message", { user, type, filename, url, timestamp })
        Server-->>Bob: io.to(room).emit("message", { user, type, filename, url, timestamp })
    end

    rect rgb(15, 23, 42)
        Note over Alice,Bob: 3. Media Rendering
        Bob->>Server: GET /uploads/[filename]
        Server-->>Bob: Serve raw image/file buffer
        Note over Bob: Message component renders inline thumbnail preview!
    end
```

---

## 🛠️ Tech Stack Deep-Dive

<div align="center">

| Layer | Technology | Version | Purpose |
|:---|:---|:---|:---|
| **Frontend Framework** | [React](https://react.dev/) | `^18.3.1` | Component-driven declarative UI state management |
| **Build & Tooling** | [Vite](https://vitejs.dev/) | `^8.2.2` | Ultra-fast Hot Module Replacement (HMR) & ESBuild bundling |
| **CSS Engine** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.3` | Modern utility-first styling with `@tailwindcss/vite` |
| **Navigation** | [React Router](https://reactrouter.com/) | `^6.22.3` | Declarative client-side routing (`/` and `/chat`) |
| **Realtime Client** | [Socket.io Client](https://socket.io/) | `^4.8.3` | Resilient WebSocket connection with automatic reconnects |
| **Query Parser** | [Query-String](https://github.com/sindresorhus/query-string) | `^9.5.1` | URL parameter serialization and extraction |
| **Scroll Utility** | [React-Scroll-To-Bottom](https://github.com/compulim/react-scroll-to-bottom) | `^4.2.0` | Pin-point auto-scrolling message container |
| **Linter** | [Oxlint](https://oxc.rs/) | `^1.79.0` | High-performance Rust-based JavaScript linting |
| **Backend Runtime** | [Node.js](https://nodejs.org/) | `LTS (>=18)` | Server-side JavaScript execution environment |
| **Web Server** | [Express](https://expressjs.com/) | `^5.2.1` | Minimalist HTTP routing and middleware framework |
| **File Handling** | [Multer](https://github.com/expressjs/multer) | `^2.4.0` | Fast `multipart/form-data` disk storage middleware |
| **Security / CORS** | [CORS](https://github.com/expressjs/cors) | `^2.8.6` | Cross-origin resource sharing middleware |
| **Realtime Engine** | [Socket.io](https://socket.io/) | `^4.8.3` | Event-driven duplex network gateway with CORS |
| **Dev Monitor** | [Nodemon](https://nodemon.io/) | `^3.1.14` | Hot-reloading watcher for local backend development |

</div>

---

## 📡 Socket & REST Protocol Specification

### WebSocket Events

#### 1. `join` (Client ➔ Server)
Invoked when a user submits their nickname and target room.
- **Direction**: Client ➔ Server
- **Payload**:
  ```json
  {
    "name": "Alex",
    "room": "TechVibe"
  }
  ```
- **Callback**: Returns an `error` string if the username is taken in that room; otherwise returns empty on success.

#### 2. `sendMessage` (Client ➔ Server)
Dispatched when a user sends a text message or a rich file attachment.
- **Direction**: Client ➔ Server
- **Payload (Text)**: `"Hello everyone!"` *(string)*
- **Payload (File Attachment)**:
  ```json
  {
    "type": "file",
    "filename": "screenshot.png",
    "url": "http://localhost:8000/uploads/1726861200000-screenshot.png"
  }
  ```
- **Callback**: Invoked after server distributes the message.

#### 3. `message` (Server ➔ Client)
Emitted by the server to all users in the room when a new message or announcement occurs.
- **Direction**: Server ➔ Client
- **Payload (Text Message)**:
  ```json
  {
    "user": "Alex",
    "text": "Hello everyone!",
    "timestamp": "2026-09-21T01:20:00.000Z"
  }
  ```
- **Payload (File Message)**:
  ```json
  {
    "user": "Alex",
    "type": "file",
    "filename": "design-mockup.png",
    "url": "http://localhost:8000/uploads/1726861200000-design-mockup.png",
    "timestamp": "2026-09-21T01:20:00.000Z"
  }
  ```

#### 4. `roomData` (Server ➔ Client)
Broadcasts live room member list changes when users enter or exit.
- **Direction**: Server ➔ Client
- **Payload**:
  ```json
  {
    "room": "TechVibe",
    "user": [
      { "id": "4kZ...k9A", "name": "alex", "room": "techvibe" },
      { "id": "9pQ...r3B", "name": "sarah", "room": "techvibe" }
    ]
  }
  ```

---

### REST API Endpoints

#### `POST /upload`
Uploads a media file or document using `multipart/form-data`.
- **Form Key**: `file` (single file)
- **Response (`200 OK`)**:
  ```json
  {
    "filename": "dashboard.png",
    "url": "http://localhost:8000/uploads/1726861200000-dashboard.png"
  }
  ```

#### `GET /uploads/:filename`
Serves the uploaded static media file with caching and content headers.

#### `GET /`
Server health check gateway confirming the backend is active.

---

## 🎨 UI & Design System

VibeSync was built from the ground up to feel like a high-end desktop client:

```
+-----------------------------------------------------------------------------+
|                                  VibeSync                                   |
|                                                                             |
|  [ # ReactDevs ] ● Active                                               [✕] |
|  +-------------------------------------------------+ +--------------------+ |
|  | [admin] Alex, welcome to the room ReactDevs     | | ONLINE USERS (2)   | |
|  |                                                 | |                    | |
|  | [Sarah]: Does anyone have experience with v4?   | | ● Alex             | |
|  |                                      10:42 PM   | | ● Sarah            | |
|  |                                                 | |                    | |
|  |               [You]: Check out this new UI! 📎  | |                    | |
|  |               [ 🖼️ image preview 300px ]        | |                    | |
|  |                                      10:43 PM   | |                    | |
|  +-------------------------------------------------+ +--------------------+ |
|  [ 📎 ] [ Type a message...                      ] [ Send ↗ ]               |
+-----------------------------------------------------------------------------+
```

### Design Tokens

- **Atmosphere**: Deep cosmic radial blend (`from-slate-950 via-slate-900 to-indigo-950`).
- **Glass Surfaces**: `bg-slate-900/80 backdrop-blur-xl border border-slate-800`.
- **Active Presence**: Emerald neon glow (`#34d399` with `drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]`).
- **Rich Media Previews**: Image thumbnail containers (`max-w-[300px] rounded-lg`) with external tab links.
- **Message Time Indicators**: Subtle micro-typography (`text-[10px] opacity-70 block text-right`).
- **Tactile Inputs**: Focus rings featuring Indigo / Cyan transitions (`focus:border-indigo-500`).

---

## 📂 Project Anatomy

```text
VibeSync/
│
├── assets/
│   └── banner.svg                  # High-res SVG banner with typography & mockups
│
├── client/
│   └── Frontend/                   # Client application root
│       ├── public/                 # Static public assets
│       ├── src/
│       │   ├── assets/             # Brand logos & media
│       │   ├── Components/         # Modular React UI components
│       │   │   ├── Chat.jsx        # Root chat screen, file upload handler & socket listeners
│       │   │   ├── Infobar.jsx     # Header bar with room name & exit link
│       │   │   ├── Input.jsx       # Input controller with attachment trigger & Enter submit
│       │   │   ├── Join.jsx        # Landing authentication & room selection form
│       │   │   ├── Message.jsx     # Bubble renderer for text, images, attachments & timestamps
│       │   │   ├── Messages.jsx    # Scroll container powered by react-scroll-to-bottom
│       │   │   └── TextContainer.jsx # Online active users sidebar roster
│       │   ├── Icon/               # Status indicator icons
│       │   ├── App.jsx             # React Router routing setup
│       │   ├── index.css           # Tailwind v4 import & CSS reset
│       │   └── main.jsx            # React root DOM hydration
│       ├── index.html              # HTML5 entrypoint
│       ├── package.json            # Client dependencies & scripts
│       └── vite.config.js          # Vite build configuration with Tailwind plugin
│
├── server/                         # Backend engine root
│   ├── uploads/                    # Local disk storage for uploaded images & media
│   ├── index.js                    # Express, Multer upload route & Socket.IO bindings
│   ├── router.js                   # Root router health check (GET /)
│   ├── user.js                     # In-memory user state functions (add, remove, query)
│   └── package.json                # Server scripts & dependencies
│
└── README.md                       # Master documentation
```

---

## 🚀 Quick Start

Get a local copy running and chatting with media sharing in under 60 seconds!

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `yarn` / `pnpm` / `bun`)

---

### Step 1: Clone the Repo

```bash
git clone https://github.com/kartikeyv-coder/VibeSync.git
cd VibeSync
```

### Step 2: Launch the Backend Server

Open your primary terminal:

```bash
cd server
npm install
npm start
```

```
> server@1.0.0 start
> nodemon index.js

Server has Started on port 8000
```

### Step 3: Launch the Frontend Client

Open a second terminal window:

```bash
cd client/Frontend
npm install
npm run dev
```

```
  VITE v8.2.2  ready in 240 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Start Chatting & Sharing Files!

1. Open `http://localhost:5173` in your browser.
2. Enter your Name (e.g. `Alex`) and Room (e.g. `GamingLounge`), then click **Sign In**.
3. Open an **Incognito Window** or another browser, enter a second Name (e.g. `Sam`) and the **same Room** (`GamingLounge`).
4. Send text messages, click **📎** to upload an image or document, and watch it sync across all clients in real time!

---

## 🔧 Scripts & Commands

### Backend (`/server`)

| Script | Command | Action |
|:---|:---|:---|
| `npm start` | `nodemon index.js` | Launches server with live file-watching and automatic restart |
| `npm test` | `echo ...` | Test runner placeholder |

### Frontend (`/client/Frontend`)

| Script | Command | Action |
|:---|:---|:---|
| `npm run dev` | `vite` | Starts local development server on port `5173` |
| `npm run build` | `vite build` | Compiles production assets into `/dist` |
| `npm run preview` | `vite preview` | Serves compiled production build locally for verification |
| `npm run lint` | `oxlint` | Runs fast Rust-powered Oxlint audit across all `.jsx` files |

---

## ❓ Troubleshooting & FAQ

<details>
<summary><strong>Q: I'm receiving a "Connection error" in the browser console.</strong></summary>

> **Solution**: Ensure your server is actively running on port `8000`. If you changed the port on the backend in `server/index.js`, update the `ENDPOINT` variable located at the top of `client/Frontend/src/Components/Chat.jsx`:
> ```javascript
> const ENDPOINT = 'http://localhost:8000';
> ```
</details>

<details>
<summary><strong>Q: Why does the app alert "Username is taken"?</strong></summary>

> **Solution**: VibeSync enforces unique handles per room. If another user in the room has chosen that handle, simply pick a different nickname or enter a different room name.
</details>

<details>
<summary><strong>Q: Where are uploaded files saved?</strong></summary>

> **Solution**: Files uploaded through the chat are saved to `server/uploads/` with a unique timestamp prefix (e.g. `1726861200000-photo.jpg`) and served via `http://localhost:8000/uploads/:filename`.
</details>

<details>
<summary><strong>Q: Can I deploy the backend and frontend separately?</strong></summary>

> **Solution**: Absolutely! You can deploy the backend to Render, Railway, or Heroku, and the frontend to Vercel or Netlify. Just set your deployed server URL as the `ENDPOINT` and file upload destination in `Chat.jsx` (or inject it via an environment variable).
</details>

<<<<<<< HEAD
---

## 🗺️ Roadmap

- [x] **Room-based WebSocket routing**
- [x] **Dynamic online user roster & presence count**
- [x] **Admin welcome and leave broadcasts**
- [x] **Glassmorphic responsive dark mode with Tailwind CSS v4**
- [x] **Rich Media & File Sharing (Multer + Express static files)**
- [x] **Message Timestamps & Localized Formatting**
- [ ] **Typing Indicator**: Display *"Alex is typing..."* when a peer types
- [ ] **Emoji & Reaction Matrix**: Tap messages to react with thumbs-up, heart, fire
- [ ] **Message Persistence**: Optional MongoDB / PostgreSQL database archive
- [ ] **Private 1-on-1 DMs**: Direct messaging alongside group chat rooms
- [ ] **Audio/Video Calls**: WebRTC peer-to-peer audio and video rooms

---
=======
>>>>>>> 34202a25aacfc61f026fa3336fa905f63e2ce67b

## 🤝 Contributing

Contributions are the lifeblood of open source. If you'd like to improve VibeSync:

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/NewAwesomeFeature`)
3. **Commit Your Changes** (`git commit -m "feat: add NewAwesomeFeature"`)
4. **Push to the Branch** (`git push origin feature/NewAwesomeFeature`)
5. **Open a Pull Request**

---

## 📜 License

This project is licensed under the **ISC License**. Feel free to use, modify, and distribute it as you wish.

---

<div align="center">

**Built with passion and modern web tech by [Kartikey](https://github.com/kartikeyv-coder)**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com/kartikeyv-coder)

*If you found VibeSync helpful, please consider giving it a ⭐ on GitHub!*

</div>
