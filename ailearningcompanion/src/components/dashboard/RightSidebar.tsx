import { Sparkles, FileText, Lightbulb, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { FileData } from '../types';

interface RightSidebarProps {
  activeFile: FileData | null;
  onQuickAction: (action: string) => void;
  onSuggestedQuestion: (question: string) => void;
}

export function RightSidebar({ activeFile, onQuickAction, onSuggestedQuestion }: RightSidebarProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const estimateWordCount = (bytes: number) => {
    // Rough estimate: 1 word ≈ 6 bytes
    return Math.floor(bytes / 6);
  };

  const estimatePages = (bytes: number) => {
    // Rough estimate: 1 page ≈ 3000 bytes
    return Math.max(1, Math.floor(bytes / 3000));
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div>
          <h3 className="text-[#1F2937] mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start hover:bg-gradient-to-r hover:from-[#6366F1]/10 hover:to-[#8B5CF6]/10 hover:border-[#6366F1]"
                onClick={() => onQuickAction(action.label)}
              >
                <action.icon className="w-4 h-4 mr-2 text-[#6366F1]" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Document Preview */}
        {activeFile && (
          <Card className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="text-[#1F2937] mb-1 truncate">{activeFile.name}</h4>
                <p className="text-[#6B7280]">{formatFileSize(activeFile.size)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Word Count</span>
                <Badge variant="secondary">~{estimateWordCount(activeFile.size).toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Pages</span>
                <Badge variant="secondary">~{estimatePages(activeFile.size)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Type</span>
                <Badge variant="secondary">{activeFile.type.split('/')[1]?.toUpperCase() || 'FILE'}</Badge>
              </div>
            </div>
          </Card>
        )}

        {/* Suggested Questions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-[#1F2937]">Suggested Questions</h3>
          </div>
          <div className="space-y-2">
            {(activeFile ? suggestedQuestionsWithFile : suggestedQuestionsGeneral).map(
              (question, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestedQuestion(question)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#6366F1] hover:bg-[#6366F1]/5 transition-colors text-[#6B7280] hover:text-[#1F2937]"
                >
                  {question}
                </button>
              )
            )}
          </div>
        </div>

        {/* Tips */}
        <Card className="p-4 bg-gradient-to-br from-[#6366F1]/5 to-[#8B5CF6]/5 border-[#6366F1]/20">
          <div className="flex items-start gap-2">
            <Zap className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[#1F2937] mb-1">Pro Tip</h4>
              <p className="text-[#6B7280]">
                Ask specific questions for better answers. Include context from your materials.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}

const quickActions = [
  { icon: Sparkles, label: 'Summarize' },
  { icon: Lightbulb, label: 'Explain Concepts' },
  { icon: FileText, label: 'Generate Flashcards' },
  { icon: Zap, label: 'Create Quiz' },
];

const suggestedQuestionsWithFile = [
  'What are the main points in this document?',
  'Explain this concept in simpler terms',
  'What are the key takeaways?',
  'Can you create study notes from this?',
];

const suggestedQuestionsGeneral = [
  'Help me understand this topic',
  'What should I focus on studying?',
  'Can you explain with examples?',
  'How can I remember this better?',
];
