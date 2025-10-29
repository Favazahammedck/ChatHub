# AI Learning Companion - Backend

This is the Node.js Express backend for the AI Learning Companion application.

## Features

- OpenAI GPT-4 integration for intelligent chat responses
- File upload and processing (PDF, TXT, DOC, DOCX)
- Firebase Firestore for data persistence
- RESTful API endpoints
- Rate limiting and security middleware
- CORS configuration for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

3. Configure your environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_PRIVATE_KEY`: Your Firebase private key
- `FIREBASE_CLIENT_EMAIL`: Your Firebase client email
- `FIREBASE_CLIENT_ID`: Your Firebase client ID
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS

4. Start the development server:
```bash
npm run dev
```

5. Start the production server:
```bash
npm start
```

## API Endpoints

### Chat
- `POST /api/chat/message` - Send a message and get AI response
- `POST /api/chat/summarize` - Generate summary of text
- `POST /api/chat/flashcards` - Generate flashcards from text

### Files
- `POST /api/files/upload` - Upload and process files
- `GET /api/files` - Get all uploaded files
- `GET /api/files/:id` - Get specific file
- `DELETE /api/files/:id` - Delete file

### Sessions
- `POST /api/sessions` - Create new chat session
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/:id` - Get specific session
- `GET /api/sessions/:id/messages` - Get session messages
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

### Health
- `GET /api/health` - Health check endpoint

## Deployment

The backend can be deployed to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

Make sure to set all environment variables in your deployment platform.

