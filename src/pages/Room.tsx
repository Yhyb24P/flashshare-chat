import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { Composer } from '@/components/chat/Composer';
import { FileUploadDialog } from '@/components/chat/FileUploadDialog';

export default function Room() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rooms, currentRoom, joinRoom } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const room = rooms.find((r) => r.id === id);

  useEffect(() => {
    if (!room) {
      navigate('/');
      return;
    }
    if (currentRoom !== id) {
      joinRoom(id!);
    }
  }, [id, room, currentRoom, joinRoom, navigate]);

  if (!room || !id) {
    return null;
  }

  return (
    <div className="h-full flex w-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background">
        <ChatHeader
          onMenuClick={() => setSidebarOpen(true)}
          onUploadClick={() => setUploadOpen(true)}
        />
        <MessageList roomId={id} />
        <Composer roomId={id} onUploadClick={() => setUploadOpen(true)} />
      </main>

      <FileUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        roomId={id}
      />
    </div>
  );
}
