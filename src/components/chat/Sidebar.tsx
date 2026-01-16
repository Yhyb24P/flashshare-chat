import { X } from 'lucide-react';
import { UserCard } from './UserCard';
import { StatusRow } from './StatusRow';
import { RoomList } from './RoomList';
import { SettingsPanel } from './SettingsPanel';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ isOpen = true, onClose, isMobile = false }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-50 animate-slide-in-left' : 'relative'}
          w-sidebar bg-card border-r border-border flex flex-col h-full
        `}
      >
        {isMobile && (
          <div className="flex items-center justify-end p-2 border-b border-border">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <UserCard />
        <StatusRow />
        <RoomList />
        <SettingsPanel />
      </aside>
    </>
  );
}
