import { Brain, Plus, Upload, FileText, Trash2, MessageSquare, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { FileData, ChatSession } from '../types';
import { Page } from '../../App';
import { formatDistanceToNow } from '../../lib/date-utils';

interface LeftSidebarProps {
  selectedAI: 'chatgpt' | 'gemini';
  onAIChange: (ai: 'chatgpt' | 'gemini') => void;
  uploadedFiles: FileData[];
  onFileUpload: (files: File[]) => void;
  onDeleteFile: (id: string) => void;
  onFileSelect: (file: FileData) => void;
  activeFileId?: string;
  chatSessions: ChatSession[];
  onSessionSelect: (session: ChatSession) => void;
  onNewChat: () => void;
  onNavigate: (page: Page) => void;
}

export function LeftSidebar({
  selectedAI,
  onAIChange,
  uploadedFiles,
  onFileUpload,
  onDeleteFile,
  onFileSelect,
  activeFileId,
  chatSessions,
  onSessionSelect,
  onNewChat,
  onNavigate,
}: LeftSidebarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Logo & Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#1F2937]">ChatHub</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('settings')}
            className="rounded-full"
          >
            <Settings className="w-5 h-5 text-[#6B7280]" />
          </Button>
        </div>

        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* AI Model Selector */}
          <div>
            <label className="text-[#1F2937] mb-2 block">AI Model</label>
            <Select value={selectedAI} onValueChange={(v) => onAIChange(v as any)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chatgpt">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#10B981]" />
                    <span>ChatGPT-4</span>
                  </div>
                </SelectItem>
                <SelectItem value="gemini">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#6366F1]" />
                    <span>Gemini</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Upload Area */}
          <div>
            <label className="text-[#1F2937] mb-2 block">Upload Materials</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#6366F1] transition-colors cursor-pointer"
            >
              <Upload className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />
              <p className="text-[#6B7280] mb-2">
                Drag & drop files here
              </p>
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div>
              <label className="text-[#1F2937] mb-2 block">
                Uploaded Files ({uploadedFiles.length})
              </label>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <Card
                    key={file.id}
                    className={`p-3 cursor-pointer hover:shadow-md transition-shadow ${
                      activeFileId === file.id ? 'ring-2 ring-[#6366F1]' : ''
                    }`}
                    onClick={() => onFileSelect(file)}
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1F2937] truncate">{file.name}</p>
                        <p className="text-[#6B7280]">{formatFileSize(file.size)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFile(file.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-[#EF4444]" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Chat History */}
          {chatSessions.length > 0 && (
            <div>
              <label className="text-[#1F2937] mb-2 block">Chat History</label>
              <div className="space-y-2">
                {chatSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onSessionSelect(session)}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1F2937] truncate mb-1">
                          {session.title}
                        </p>
                        <p className="text-[#6B7280] truncate mb-1">
                          {session.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {session.messageCount} messages
                          </Badge>
                          <span className="text-[#6B7280]">
                            {formatDistanceToNow((session as any).updatedAt || (session as any).createdAt, { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}