# Karina's Bakery

Welcome to Karina's Bakery project!

This project consists of two three parts:

- **client** - Frontend - which runs on React.js
- **admin** - Admin frontend - which runs on React.js
- **functions** - Backend - which is Firebase Cloud Functions-based Node.js Express app

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
cd client && npm install
```

Then, navigate to the admin folder and install the backend dependencies:

```bash
cd admin && npm install
```

Then, navigate to the functions folder and install the backend dependencies:

```bash
cd functions && npm install
```

### 3. Set up local Firebase CLI

#### 1. Install the Firebase CLI on your local machine.

##### For Windows:

Download the Firebase CLI installer from Firebase CLI GitHub Releases.

Run the installer and follow the instructions.

Verify the installation:

```bash
firebase --version
```

##### For macOS:

Open Terminal.

Install Firebase CLI using npm (requires Node.js):

```bash
npm install -g firebase-tools
```

Verify the installation:

```bash
firebase --version
```

#### 2. Login into Firebase CLI

Open main terminal in your project root folder (Karinas-New in our case)

Run:

```bash
firebase login
```

Answer no - "n" - on following question

```bash
? Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? (Y/n)
```

Firebase CLI will redirect you to your browser. If not, use the provided url in the terminal under following line

```bash
Visit this URL on this device to log in:
[your-url]
```

Log into your organization account, follow the steps and verify your authentication in terminal

```bash
✔  Success! Logged in as **your@email.com**
```

Now your are ready to use Firebase CLI functionality

### 4. Run projects locally

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

#### 2. Run the Frontend (Client)

In the second terminal, navigate to the admin folder:

```bash
cd admin
```

Run the admin project:

```bash
npm start
```

This will start the React admin locally, usually accessible at http://localhost:3000.

#### 3. Run the Backend (Functions)

In the second terminal, navigate to the functions folder:

```bash
cd functions
```

Run the backend project:

```bash
npm start
```

This will start the Firebase Cloud Functions backend locally. You can use the Firebase Emulator or deploy it to Firebase depending on your setup.

### 5. TODO: write deployment instructions
