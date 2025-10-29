import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LeftSidebar } from './dashboard/LeftSidebar';
import { ChatArea } from './dashboard/ChatArea';
import { RightSidebar } from './dashboard/RightSidebar';
import { MobileNav } from './dashboard/MobileNav';
import { FileData, Message, ChatSession } from './types';
import { apiService } from '../services/api';

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedAI, setSelectedAI] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [activeFile, setActiveFile] = useState<FileData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadSessions();
    loadFiles();
  }, []);

  const loadSessions = async () => {
    try {
      const sessions = await apiService.getSessions();
      setChatSessions(sessions);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  };

  const loadFiles = async () => {
    try {
      const files = await apiService.getFiles();
      setUploadedFiles(files);
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setIsLoading(true);
    try {
      const uploadPromises = files.map(file => apiService.uploadFile(file));
      const uploadedFiles = await Promise.all(uploadPromises);
      
      setUploadedFiles((prev) => [...prev, ...uploadedFiles]);
      if (uploadedFiles.length > 0 && !activeFile) {
        setActiveFile(uploadedFiles[0]);
      }
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async (id: string) => {
    try {
      await apiService.deleteFile(id);
      setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
      if (activeFile?.id === id) {
        setActiveFile(null);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
      alert('Failed to delete file. Please try again.');
    }
  };

  const handleSendMessage = async (content: string) => {
    let sessionIdToUse = currentSessionId;
    if (!sessionIdToUse) {
      // Create a new session if none exists
      try {
        const newSession = await apiService.createSession(content.substring(0, 50));
        sessionIdToUse = newSession.id; // use immediately to avoid relying on async state update
        setCurrentSessionId(newSession.id);
        setChatSessions(prev => [newSession, ...prev]);
      } catch (error) {
        console.error('Failed to create session:', error);
        return;
      }
    }

    setIsLoading(true);
    
    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      sessionId: sessionIdToUse!,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Get context from active file if available
      const context = activeFile?.text ? activeFile.text.substring(0, 2000) : '';
      
      // Send to API
      const response = await apiService.sendMessage(content, sessionIdToUse!, context);
      
      // Add AI response to UI
      setMessages((prev) => [...prev, response.aiMessage]);
      
      // Update session in the list
      setChatSessions(prev => prev.map(session => 
        session.id === sessionIdToUse 
          ? { ...session, lastMessage: content, messageCount: session.messageCount + 2 }
          : session
      ));
      
    } catch (error) {
      console.error('Failed to send message:', error);
      // Remove the user message if API call failed
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (!activeFile) {
      handleSendMessage(`Please ${action.toLowerCase()} the concepts we've discussed.`);
    } else {
      handleSendMessage(`Please ${action.toLowerCase()} the document "${activeFile.name}".`);
    }
  };

  const handleNewChat = async () => {
    try {
      const newSession = await apiService.createSession('New Chat');
      setCurrentSessionId(newSession.id);
      setChatSessions(prev => [newSession, ...prev]);
      setMessages([]);
      setActiveFile(null);
    } catch (error) {
      console.error('Failed to create new chat:', error);
      alert('Failed to create new chat. Please try again.');
    }
  };

  const handleNavigate = (page: string) => {
    if (page === 'landing') {
      navigate('/');
    } else if (page === 'dashboard') {
      navigate('/dashboard');
    } else if (page === 'settings') {
      navigate('/settings');
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB]">
      {/* Mobile Navigation */}
      <MobileNav
        onNavigate={handleNavigate}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
      />

      {/* Desktop Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:relative z-30
          w-80 h-full
          transition-transform duration-300
          bg-white border-r border-gray-200
        `}>
          <LeftSidebar
            selectedAI={selectedAI}
            onAIChange={setSelectedAI}
            uploadedFiles={uploadedFiles}
            onFileUpload={handleFileUpload}
            onDeleteFile={handleDeleteFile}
            onFileSelect={setActiveFile}
            activeFileId={activeFile?.id}
            chatSessions={chatSessions}
            onSessionSelect={async (session) => {
              try {
                setCurrentSessionId(session.id);
                const sessionMessages = await apiService.getSessionMessages(session.id);
                setMessages(sessionMessages);
              } catch (error) {
                console.error('Failed to load session:', error);
                alert('Failed to load chat session. Please try again.');
              }
            }}
            onNewChat={handleNewChat}
            onNavigate={handleNavigate}
          />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatArea
            messages={messages}
            onSendMessage={handleSendMessage}
            activeFile={activeFile}
            selectedAI={selectedAI}
            isLoading={isLoading}
          />
        </div>

        {/* Right Sidebar - Hidden on mobile/tablet */}
        <div className="hidden lg:block w-80 border-l border-gray-200 bg-white">
          <RightSidebar
            activeFile={activeFile}
            onQuickAction={handleQuickAction}
            onSuggestedQuestion={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
