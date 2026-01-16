import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ComposerProps {
  roomId: string;
  onUploadClick: () => void;
}

export function Composer({ roomId, onUploadClick }: ComposerProps) {
  const { user, addMessage } = useAppStore();
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed) return;

    addMessage({
      roomId,
      userId: user.id,
      userName: user.displayName,
      content: trimmed,
      type: 'text',
    });

    setContent('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 text-muted-foreground hover:text-foreground"
          onClick={onUploadClick}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Ctrl+Enter to send)"
          className="min-h-[44px] max-h-[200px] resize-none"
          rows={1}
        />

        <Button
          onClick={handleSend}
          disabled={!content.trim()}
          className="flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
