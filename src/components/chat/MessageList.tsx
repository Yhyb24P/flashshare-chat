import { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  roomId: string;
}

export function MessageList({ roomId }: MessageListProps) {
  const { messages } = useAppStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  const roomMessages = messages.filter((m) => m.roomId === roomId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomMessages.length]);

  if (roomMessages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No messages yet
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Be the first to send a message in this room. Share files or start a conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-2">
      {roomMessages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
