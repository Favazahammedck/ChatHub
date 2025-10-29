import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Brain, User, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Message, FileData } from '../types';
import { formatDistanceToNow } from '../../lib/date-utils';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  activeFile: FileData | null;
  selectedAI: 'chatgpt' | 'gemini';
  isLoading?: boolean;
}

export function ChatArea({ messages, onSendMessage, activeFile, selectedAI, isLoading: externalLoading }: ChatAreaProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || externalLoading) return;

    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-[#1F2937]">
              {activeFile ? activeFile.name : 'New Chat'}
            </h2>
            <Badge
              variant="secondary"
              className={`${
                selectedAI === 'chatgpt'
                  ? 'bg-[#10B981]/10 text-[#10B981]'
                  : 'bg-[#6366F1]/10 text-[#6366F1]'
              }`}
            >
              {selectedAI === 'chatgpt' ? 'ChatGPT-4' : 'Gemini'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-[#6366F1]" />
              </div>
              <h3 className="text-[#1F2937] mb-2">Start a Conversation</h3>
              <p className="text-[#6B7280]">
                {activeFile
                  ? `Ask me anything about "${activeFile.name}"`
                  : 'Upload a file or ask me anything to get started'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {(isLoading || externalLoading) && <LoadingMessage />}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your notes..."
              className="min-h-[48px] max-h-32 resize-none pr-12"
              rows={1}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8"
            >
              <Paperclip className="w-4 h-4 text-[#6B7280]" />
            </Button>
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading || externalLoading}
            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 h-12 w-12 p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Try using the Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback method
        fallbackCopyTextToClipboard(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // If clipboard API fails, use fallback
      fallbackCopyTextToClipboard(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  if (message.sender === 'user') {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-[#EEF2FF] rounded-2xl rounded-tr-sm p-4 max-w-[80%] shadow-sm">
          <p className="text-[#1F2937] whitespace-pre-wrap">{message.content}</p>
          <p className="text-[#6B7280] mt-2">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </p>
        </div>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-gradient-to-br from-[#14B8A6] to-[#10B981] text-white">
          <Brain className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 group">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 max-w-[80%] shadow-sm">
          <p className="text-[#1F2937] whitespace-pre-wrap">{message.content}</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-[#6B7280]">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-3 h-3 text-[#10B981]" />
              ) : (
                <Copy className="w-3 h-3 text-[#6B7280]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingMessage() {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-gradient-to-br from-[#14B8A6] to-[#10B981] text-white">
          <Brain className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 shadow-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}