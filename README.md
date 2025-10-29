# AI Learning Companion - Fullstack Application

A comprehensive AI-powered study companion that helps students learn efficiently by uploading study materials and interacting with AI models for context-based questions, summaries, and explanations.

## 🚀 Features

### Core Functionality
- **Multi-AI Chat Interface**: Powered by OpenAI GPT-4 for intelligent conversations
- **File Upload & Processing**: Support for PDF, TXT, DOC, and DOCX files
- **Context-Aware Responses**: AI responses based on uploaded study materials
- **Chat Session Management**: Persistent chat history with Firebase
- **Real-time Communication**: Instant AI responses with loading states

### Advanced Features
- **Smart Summarization**: AI-generated summaries of uploaded documents
- **Flashcard Generation**: Automatic creation of study flashcards
- **File Context Integration**: AI responses include relevant document context
- **Session Persistence**: All conversations saved and retrievable
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Components**: Radix UI with Tailwind CSS
- **State Management**: React hooks and context
- **Routing**: React Router for navigation
- **API Integration**: Custom service layer for backend communication

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express.js
- **AI Integration**: OpenAI GPT-4 API
- **Database**: Firebase Firestore for data persistence
- **File Processing**: PDF parsing and text extraction
- **Security**: Rate limiting, CORS, and input validation
- **Error Handling**: Comprehensive error handling and logging

### Database (Firebase Firestore)
- **Collections**: 
  - `sessions`: Chat session metadata
  - `messages`: Individual chat messages
  - `files`: Uploaded file information and content
- **Real-time**: Live updates for chat messages
- **Security**: Firestore security rules for data protection

## 📁 Project Structure

```
multiailearningcompanion/
├── ailearningcompanion/          # Frontend Application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── ui/              # Reusable UI components
│   │   │   └── types.ts         # TypeScript type definitions
│   │   ├── services/            # API service layer
│   │   ├── lib/                 # Utility functions
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets
│   └── package.json
├── backend/                     # Backend Application
│   ├── routes/                  # API route handlers
│   ├── services/                # Business logic services
│   ├── config/                  # Configuration files
│   └── uploads/                 # File upload directory
├── docker-compose.yml           # Docker orchestration
└── SETUP_GUIDE.md              # Detailed setup instructions
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI language model
- **Firebase Admin SDK** - Database operations
- **Multer** - File upload handling
- **PDF-Parse** - PDF text extraction
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Database & Storage
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - File storage (optional)
- **Firebase Authentication** - User management (future)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key
- Firebase project

### 1. Clone the Repository
```bash
git clone <repository-url>
cd multiailearningcompanion
```

### 2. Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your credentials
npm run dev
```

### 3. Frontend Setup
```bash
cd ../ailearningcompanion
npm install
cp env.example .env
# Edit .env with API URL
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📋 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🔧 API Endpoints

### Chat Endpoints
- `POST /api/chat/message` - Send message and get AI response
- `POST /api/chat/summarize` - Generate text summary
- `POST /api/chat/flashcards` - Generate flashcards

### File Endpoints
- `POST /api/files/upload` - Upload and process files
- `GET /api/files` - Get all files
- `GET /api/files/:id` - Get specific file
- `DELETE /api/files/:id` - Delete file

### Session Endpoints
- `POST /api/sessions` - Create chat session
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/:id` - Get specific session
- `GET /api/sessions/:id/messages` - Get session messages
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

## 🐳 Docker Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Individual Services
```bash
# Backend
cd backend
docker build -t ai-companion-backend .
docker run -p 5000:5000 ai-companion-backend

# Frontend
cd ailearningcompanion
docker build -t ai-companion-frontend .
docker run -p 3000:80 ai-companion-frontend
```

## 🌐 Deployment Options

### Backend Deployment
- **Heroku**: Easy deployment with environment variables
- **Railway**: Modern platform with automatic deployments
- **Render**: Simple deployment with built-in monitoring
- **DigitalOcean App Platform**: Scalable cloud deployment
- **AWS Elastic Beanstalk**: Enterprise-grade deployment

### Frontend Deployment
- **Vercel**: Optimized for React applications
- **Netlify**: Great for static sites with serverless functions
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3 + CloudFront**: Scalable static hosting

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Sanitized user inputs
- **File Type Validation**: Only allowed file types
- **Error Handling**: Secure error messages
- **Environment Variables**: Sensitive data protection

## 📊 Performance Optimizations

- **File Size Limits**: 10MB maximum file size
- **Text Extraction**: Efficient PDF and document processing
- **Caching**: Optimized API responses
- **Lazy Loading**: Component-based code splitting
- **Image Optimization**: Compressed assets
- **Database Indexing**: Optimized Firestore queries

## 🧪 Testing

### Manual Testing
1. Upload various file types (PDF, TXT, DOC)
2. Test chat functionality with different questions
3. Verify session persistence
4. Test file deletion and management
5. Check responsive design on different devices

### API Testing
```bash
# Health check
curl http://localhost:5000/api/health

# Test file upload
curl -X POST -F "file=@test.pdf" http://localhost:5000/api/files/upload
```

## 🚧 Future Enhancements

### Planned Features
- **User Authentication**: Firebase Auth integration
- **User Management**: Multi-user support
- **Advanced AI Features**: More AI capabilities
- **Real-time Collaboration**: Shared sessions
- **Mobile App**: React Native version
- **Analytics**: Usage tracking and insights

### Technical Improvements
- **Caching Layer**: Redis integration
- **CDN**: Global content delivery
- **Monitoring**: Application performance monitoring
- **Logging**: Comprehensive logging system
- **Testing**: Automated test suite
- **CI/CD**: Continuous integration and deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
1. Check the SETUP_GUIDE.md for detailed instructions
2. Review the troubleshooting section
3. Check console logs for errors
4. Verify all environment variables are set correctly

## 🎯 Key Benefits

- **Educational Focus**: Designed specifically for students
- **AI-Powered**: Leverages advanced AI for intelligent responses
- **User-Friendly**: Intuitive interface with modern design
- **Scalable**: Built with scalability in mind
- **Secure**: Comprehensive security measures
- **Extensible**: Easy to add new features and capabilities

The AI Learning Companion is now ready for development, testing, and deployment! 🎉

