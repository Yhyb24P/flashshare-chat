import { useNavigate } from 'react-router-dom';
import { Menu, Users, LogOut, Trash2, Upload } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ChatHeaderProps {
  onMenuClick: () => void;
  onUploadClick: () => void;
}

export function ChatHeader({ onMenuClick, onUploadClick }: ChatHeaderProps) {
  const navigate = useNavigate();
  const { currentRoom, rooms, leaveRoom, clearChat } = useAppStore();
  const room = rooms.find((r) => r.id === currentRoom);

  const handleLeave = () => {
    leaveRoom();
    navigate('/');
  };

  const handleClear = () => {
    if (currentRoom) {
      clearChat(currentRoom);
    }
  };

  return (
    <header className="h-header flex items-center justify-between px-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="font-semibold text-foreground">
            {room?.name || 'Select a Room'}
          </h1>
          {room && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <Users className="h-3 w-3 ml-1" />
              <span>{room.onlineCount} online</span>
            </div>
          )}
        </div>
      </div>

      {room && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={onUploadClick}
          >
            <Upload className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Upload</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear chat history?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all messages in this room. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClear} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Clear
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleLeave}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Leave</span>
          </Button>
        </div>
      )}
    </header>
  );
}
