# Expo-Sample Chat App

A **real-time chat** application built with **Expo React Native** on the front end and **Node.js/Express** on the back end. It supports:

- 🔑 User authentication (JWT & bcrypt)  
- 💬 Creating, joining, and listing chat rooms  
- ⚡️ Live messaging & delivery receipts via Socket.IO  
- ⌨️ “Typing…” indicators  
- 📱 Mobile (iOS/Android) & web support out of the box

---

## 📋 Table of Contents

1. [Tech Stack](#-tech-stack)  
2. [Prerequisites](#-prerequisites)  
3. [Environment Variables](#-environment-variables)  
4. [Getting Started](#-getting-started)  
   - [Backend](#backend)  
   - [Frontend](#frontend)  
5. [Project Structure](#-project-structure)  
6. [Available Scripts](#-available-scripts)  
7. [Contributing](#-contributing)  
8. [License](#-license)

---

## 🔧 Tech Stack

- **Frontend**  
  - Expo / React Native (TypeScript)  
  - Socket.IO Client  
  - Axios  
  - React Navigation  
- **Backend**  
  - Node.js / Express (TypeScript)  
  - Socket.IO Server  
  - MySQL2  
  - JWT (jsonwebtoken)  
  - Bcrypt  
- **Utilities**  
  - dotenv for env management  
  - ESLint & Prettier  

---

## ⚙️ Prerequisites

- **Node.js** v16+  
- **Yarn** (or npm)  
- **MySQL** server (or compatible)  
- **Git**  
- **Expo CLI**  
  ```bash
  npm install –g expo-cli
