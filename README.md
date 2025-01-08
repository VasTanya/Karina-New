# Karina's Bakery

Welcome to Karina's Bakery project!

This project consists of two main parts:

- **client** - Frontend - which runs on React.js
- **functions** - Backend - which is Firebase Cloud Functions-based Node.js Express

## Getting Started

To get started with this project, follow the steps below:

### 1. Clone the Repository

Start by cloning the project into your local machine:

```bash
git clone https://github.com/your-username/karinas-bakery.git
```

### 2. Install The Dependencies

First, navigate to the client folder and install the frontend dependencies:

```bash
cd client/ && npm install
```

Then, navigate to the functions folder and install the backend dependencies:

```bash
cd functions && npm install
```

### 3. Run projects locally

Before running the projects, make sure to have the required .env files for both client and backend. You can request these .env files from the project maintainers.

Once you have the .env files, open two terminals:

#### 1. Run the Frontend (Client)

In the first terminal, navigate to the client folder:

```bash
cd client
```

Run the frontend project:

```bash
npm start
```

This will start the React frontend locally, usually accessible at http://localhost:3000.

#### 2. Run the Backend (Functions)

In the second terminal, navigate to the functions folder:

```bash
cd functions
```

Run the backend project:

```bash
npm start
```

This will start the Firebase Cloud Functions backend locally. You can use the Firebase Emulator or deploy it to Firebase depending on your setup.
