import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  displayName: string;
  avatar: string;
}

export interface Room {
  id: string;
  name: string;
  onlineCount: number;
  lastActivity: Date;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  file?: FileAttachment;
}

export interface Settings {
  markdown: boolean;
  codeHighlight: boolean;
  sound: boolean;
  compactMode: boolean;
  theme: 'light' | 'dark';
}

interface AppState {
  user: User;
  currentRoom: string | null;
  rooms: Room[];
  messages: Message[];
  settings: Settings;
  isConnected: boolean;
  
  // Actions
  setUser: (user: Partial<User>) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearChat: (roomId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const mockRooms: Room[] = [
  { id: 'general', name: 'General Chat', onlineCount: 12, lastActivity: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 'dev-team', name: 'Dev Team', onlineCount: 5, lastActivity: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 'design', name: 'Design Hub', onlineCount: 3, lastActivity: new Date(Date.now() - 1000 * 60 * 45) },
  { id: 'random', name: 'Random', onlineCount: 8, lastActivity: new Date(Date.now() - 1000 * 60 * 120) },
  { id: 'file-share', name: 'File Share', onlineCount: 2, lastActivity: new Date(Date.now() - 1000 * 60 * 180) },
];

const mockMessages: Message[] = [
  {
    id: '1',
    roomId: 'general',
    userId: 'system',
    userName: 'System',
    content: 'Welcome to General Chat! Share files and messages with your team.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: 'system',
  },
  {
    id: '2',
    roomId: 'general',
    userId: 'alice',
    userName: 'Alice Chen',
    content: 'Hey everyone! 👋 Just finished the new mockups.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'text',
  },
  {
    id: '3',
    roomId: 'general',
    userId: 'bob',
    userName: 'Bob Smith',
    content: 'Nice! Can you share them here?',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: 'text',
  },
  {
    id: '4',
    roomId: 'general',
    userId: 'alice',
    userName: 'Alice Chen',
    content: '',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: 'file',
    file: {
      id: 'f1',
      name: 'mockups-v2.zip',
      size: 4500000,
      type: 'application/zip',
      url: '#',
    },
  },
  {
    id: '5',
    roomId: 'general',
    userId: 'charlie',
    userName: 'Charlie Davis',
    content: 'These look great! Love the new color scheme.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: 'text',
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        id: generateId(),
        displayName: 'Anonymous User',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${generateId()}`,
      },
      currentRoom: null,
      rooms: mockRooms,
      messages: mockMessages,
      settings: {
        markdown: true,
        codeHighlight: true,
        sound: true,
        compactMode: false,
        theme: 'light',
      },
      isConnected: true,

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      joinRoom: (roomId) => {
        const room = get().rooms.find((r) => r.id === roomId);
        if (room) {
          set({ currentRoom: roomId });
          // Add system message
          get().addMessage({
            roomId,
            userId: 'system',
            userName: 'System',
            content: `${get().user.displayName} joined the room`,
            type: 'system',
          });
        }
      },

      leaveRoom: () => {
        const { currentRoom, user } = get();
        if (currentRoom) {
          get().addMessage({
            roomId: currentRoom,
            userId: 'system',
            userName: 'System',
            content: `${user.displayName} left the room`,
            type: 'system',
          });
        }
        set({ currentRoom: null });
      },

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: generateId(),
              timestamp: new Date(),
            },
          ],
        })),

      clearChat: (roomId) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.roomId !== roomId),
        })),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      setTheme: (theme) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        set((state) => ({
          settings: { ...state.settings, theme },
        }));
      },
    }),
    {
      name: 'flashshare-storage',
      partialize: (state) => ({
        user: state.user,
        messages: state.messages,
        settings: state.settings,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.settings?.theme) {
          document.documentElement.classList.add(state.settings.theme);
        }
      },
    }
  )
);
