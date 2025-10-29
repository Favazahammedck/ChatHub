export interface FileData {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  type: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  aiModel?: 'chatgpt' | 'gemini';
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  messageCount: number;
}
