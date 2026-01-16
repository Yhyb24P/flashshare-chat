import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Clock, ArrowRight } from 'lucide-react';
import { useAppStore, Room } from '@/store/appStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

function RoomItem({ room }: { room: Room }) {
  const navigate = useNavigate();
  const { joinRoom, currentRoom } = useAppStore();
  const isActive = currentRoom === room.id;

  const handleJoin = () => {
    joinRoom(room.id);
    navigate(`/room/${room.id}`);
  };

  return (
    <div
      className={`group p-3 rounded-lg transition-colors cursor-pointer ${
        isActive
          ? 'bg-primary/10 border border-primary/20'
          : 'hover:bg-secondary'
      }`}
      onClick={handleJoin}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground truncate">
            {room.name}
          </h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {room.onlineCount}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(room.lastActivity), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function RoomList() {
  const { rooms } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 px-4 py-3">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Active Rooms
      </h3>
      
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <RoomItem key={room.id} room={room} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No rooms found
          </div>
        )}
      </div>
    </div>
  );
}
