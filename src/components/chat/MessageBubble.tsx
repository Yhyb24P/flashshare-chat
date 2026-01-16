import { Download, FileIcon } from 'lucide-react';
import { Message, useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { user, settings } = useAppStore();
  const isOwn = message.userId === user.id;
  const isSystem = message.type === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4 animate-fade-in">
        <div className="bg-bubble-system text-muted-foreground text-xs px-4 py-2 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-3 animate-fade-in ${
        settings.compactMode ? 'my-1' : 'my-4'
      } ${isOwn ? 'flex-row-reverse' : ''}`}
    >
      {!settings.compactMode && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.userId}`}
            alt={message.userName}
          />
          <AvatarFallback className="text-xs">
            {message.userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[75%]`}>
        {!settings.compactMode && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-foreground">
              {message.userName}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(message.timestamp), 'HH:mm')}
            </span>
          </div>
        )}

        {message.type === 'file' && message.file ? (
          <div
            className={`rounded-lg p-4 ${
              isOwn ? 'bg-bubble-own' : 'bg-bubble-other'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(message.file.size)}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-2xl px-4 py-2 ${
              isOwn
                ? 'bg-primary text-primary-foreground rounded-br-sm'
                : 'bg-bubble-other text-foreground rounded-bl-sm'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        )}

        {settings.compactMode && (
          <span className="text-xs text-muted-foreground mt-0.5">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
        )}
      </div>
    </div>
  );
}
