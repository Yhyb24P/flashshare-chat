import { useState } from 'react';
import { Copy, Check, Edit2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function UserCard() {
  const { user, setUser } = useAppStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingId, setIsEditingId] = useState(false);
  const [tempName, setTempName] = useState(user.displayName);
  const [tempId, setTempId] = useState(user.id);
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUser({ displayName: tempName.trim() });
    }
    setIsEditingName(false);
  };

  const handleSaveId = () => {
    if (tempId.trim()) {
      setUser({ id: tempId.trim() });
    }
    setIsEditingId(false);
  };

  return (
    <div className="p-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
          <AvatarImage src={user.avatar} alt={user.displayName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user.displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          {isEditingName ? (
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              className="h-7 text-sm font-medium"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-1 group text-left"
            >
              <span className="font-semibold text-foreground truncate">
                {user.displayName}
              </span>
              <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          <div className="flex items-center gap-1 mt-1">
            {isEditingId ? (
              <Input
                value={tempId}
                onChange={(e) => setTempId(e.target.value)}
                onBlur={handleSaveId}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveId()}
                className="h-6 text-xs font-mono"
                autoFocus
              />
            ) : (
              <>
                <button
                  onClick={() => setIsEditingId(true)}
                  className="text-xs text-muted-foreground font-mono truncate hover:text-foreground transition-colors"
                >
                  @{user.id}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-muted-foreground hover:text-foreground"
                  onClick={handleCopyId}
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-success" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
