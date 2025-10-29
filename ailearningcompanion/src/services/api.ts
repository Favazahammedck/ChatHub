const API_BASE_URL =
"https://chat-hub-wuu8.onrender.com/api"
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sessionId: string;
  aiModel?: 'chatgpt' | 'gemini';
}

export interface ChatSession {
  id: string;
  title: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  lastMessage: string;
  isActive: boolean;
}

export interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  processedAt: Date;
  text: string;
  metadata: any;
  firebaseId?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Chat endpoints
  async sendMessage(message: string, sessionId: string, context?: string): Promise<{
    userMessage: Message;
    aiMessage: Message;
  }> {
    return this.request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId, context }),
    });
  }

  async generateSummary(text: string): Promise<{ summary: string }> {
    return this.request('/chat/summarize', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async generateFlashcards(text: string): Promise<{ flashcards: any }> {
    return this.request('/chat/flashcards', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  // File endpoints
  async uploadFile(file: File): Promise<FileData> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getFile(id: string): Promise<FileData> {
    return this.request(`/files/${id}`);
  }

  async getFiles(): Promise<FileData[]> {
    return this.request('/files');
  }

  async deleteFile(id: string): Promise<{ message: string }> {
    return this.request(`/files/${id}`, {
      method: 'DELETE',
    });
  }

  // Session endpoints
  async createSession(title?: string, userId?: string): Promise<ChatSession> {
    return this.request('/sessions', {
      method: 'POST',
      body: JSON.stringify({ title, userId }),
    });
  }

  async getSessions(userId?: string): Promise<ChatSession[]> {
    const params = userId ? `?userId=${userId}` : '';
    return this.request(`/sessions${params}`);
  }

  async getSession(id: string): Promise<ChatSession> {
    return this.request(`/sessions/${id}`);
  }

  async getSessionMessages(sessionId: string): Promise<Message[]> {
    return this.request(`/sessions/${sessionId}/messages`);
  }

  async updateSession(id: string, updates: Partial<ChatSession>): Promise<ChatSession> {
    return this.request(`/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteSession(id: string): Promise<{ message: string }> {
    return this.request(`/sessions/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; environment: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();

