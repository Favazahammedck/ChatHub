import { Home, Upload, MessageSquare, History, User, Menu, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Page } from '../../App';

interface MobileNavProps {
  onNavigate: (page: Page) => void;
  onMenuClick: () => void;
  onNewChat: () => void;
}

export function MobileNav({ onNavigate, onMenuClick, onNewChat }: MobileNavProps) {
  return (
    <>
      {/* Top Mobile Header */}
      <div className="md:hidden border-b border-gray-200 bg-white p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        <span className="text-[#1F2937]">Chathub</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('settings')}
        >
          <User className="w-5 h-5" />
        </Button>
      </div>

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="grid grid-cols-5 gap-1 p-2">
          <MobileNavButton icon={Home} label="Home" onClick={() => onNavigate('landing')} />
          <MobileNavButton icon={Upload} label="Upload" onClick={onMenuClick} />
          <MobileNavButton icon={MessageSquare} label="Chat" onClick={onNewChat} primary />
          <MobileNavButton icon={History} label="History" onClick={onMenuClick} />
          <MobileNavButton icon={User} label="Profile" onClick={() => onNavigate('settings')} />
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={onNewChat}
        className="md:hidden fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 z-20"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </>
  );
}

interface MobileNavButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  primary?: boolean;
}

function MobileNavButton({ icon: Icon, label, onClick, primary }: MobileNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg ${
        primary
          ? 'text-[#6366F1]'
          : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs">{label}</span>
    </button>
  );
}
