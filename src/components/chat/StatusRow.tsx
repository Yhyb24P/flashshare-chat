import { useAppStore } from '@/store/appStore';
import { Badge } from '@/components/ui/badge';

export function StatusRow() {
  const { isConnected, currentRoom, rooms } = useAppStore();
  const room = rooms.find((r) => r.id === currentRoom);

  return (
    <div className="px-4 py-3 border-b border-border flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            isConnected ? 'bg-success animate-pulse-dot' : 'bg-destructive'
          }`}
        />
        <span className="text-xs text-muted-foreground">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      
      {room && (
        <Badge variant="secondary" className="text-xs">
          {room.name}
        </Badge>
      )}
    </div>
  );
}
