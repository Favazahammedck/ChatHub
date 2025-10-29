# AI Learning Companion - Complete Setup Guide

This guide will help you set up the fullstack AI Learning Companion application with OpenAI integration and Firebase storage.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key
- Firebase project
- Git

## Project Structure

```
multiailearningcompanion/
├── ailearningcompanion/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── backend/                      # Backend (Node.js + Express)
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── package.json
└── SETUP_GUIDE.md
```

## Step 1: Backend Setup

### 1.1 Navigate to backend directory
```bash
cd backend
```

### 1.2 Install dependencies
```bash
npm install
```

### 1.3 Configure environment variables
```bash
cp env.example .env
```

Edit `.env` file with your credentials:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 1.4 Start the backend server
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

## Step 2: Frontend Setup

### 2.1 Navigate to frontend directory
```bash
cd ../ailearningcompanion
```

### 2.2 Install dependencies
```bash
npm install
```

### 2.3 Configure environment variables
```bash
cp env.example .env
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2.4 Start the frontend development server
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## Step 3: Firebase Setup

### 3.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

### 3.2 Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database

### 3.3 Generate Service Account Key
1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the following values for your backend `.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key_id` → `FIREBASE_PRIVATE_KEY_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `client_id` → `FIREBASE_CLIENT_ID`

## Step 4: OpenAI Setup

### 4.1 Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your backend `.env` file

### 4.2 Add Billing (Required)
- OpenAI requires billing information to use the API
- Add a payment method in your OpenAI account

## Step 5: Testing the Application

### 5.1 Start both servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd ailearningcompanion
npm run dev
```

### 5.2 Test the application
1. Open `http://localhost:5173`
2. Upload a PDF or text file
3. Start a chat conversation
4. Verify that AI responses are generated

## Step 6: Deployment

### 6.1 Backend Deployment (Heroku example)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set FIREBASE_PROJECT_ID=your_project_id
# ... set all other environment variables

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

### 6.2 Frontend Deployment (Vercel example)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd ailearningcompanion
vercel

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-backend-url.herokuapp.com/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in backend `.env`
   - Check that frontend URL matches the CORS configuration

2. **OpenAI API Errors**
   - Verify API key is correct
   - Check billing is set up
   - Ensure sufficient credits

3. **Firebase Connection Issues**
   - Verify service account key is correct
   - Check Firestore rules allow read/write
   - Ensure project ID matches

4. **File Upload Issues**
   - Check file size limits (10MB max)
   - Verify file types are supported
   - Check backend uploads directory permissions

### Debug Mode
- Set `NODE_ENV=development` for detailed error messages
- Check browser console for frontend errors
- Check backend console for API errors

## Features Implemented

✅ **Backend Features:**
- OpenAI GPT-4 integration
- File upload and processing (PDF, TXT, DOC, DOCX)
- Firebase Firestore integration
- RESTful API endpoints
- Rate limiting and security
- CORS configuration

✅ **Frontend Features:**
- Real-time chat interface
- File upload with drag & drop
- Chat session management
- Loading states and error handling
- Responsive design

✅ **Data Persistence:**
- Chat messages stored in Firebase
- File metadata and content storage
- Session management
- User data persistence

## Next Steps

1. **Authentication**: Add user authentication with Firebase Auth
2. **User Management**: Implement user-specific data isolation
3. **Advanced Features**: Add more AI capabilities (summarization, flashcards)
4. **Performance**: Implement caching and optimization
5. **Monitoring**: Add logging and analytics

## Support

If you encounter any issues:
1. Check the console logs for errors
2. Verify all environment variables are set
3. Ensure all services are running
4. Check network connectivity

The application is now ready for development and can be extended with additional features as needed!

