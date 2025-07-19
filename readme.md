# Handcrafted Haven – Setup Instructions

## Prerequisites

* Node.js (v18+ recommended)
* MongoDB Atlas account or local MongoDB
* Git

---

## Steps to Setup and Run the Project

### 1. Clone the Repository

```bash
git clone link or unzip handcrafted-haven.zip
cd handcrafted-haven
```

### 2. Set Up Backend

```bash
cd server
npm install
```

#### 2.1 Create .env file in `server/`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

#### 2.2 Start Backend Server

```bash
npm run dev
```

### 3. Set Up Frontend

```bash
cd ../client
npm install
npm run dev
```

---

Project runs at:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5500](http://localhost:5500)

Make sure MongoDB is connected and both servers are running.
