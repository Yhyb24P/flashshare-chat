import { useState } from 'react';
import { Share2, Users, Zap, Shield } from 'lucide-react';
import { Sidebar } from '@/components/chat/Sidebar';

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-header flex items-center px-4 border-b border-border bg-card">
          <button
            className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-3 font-semibold">FlashShare</span>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-8 animate-fade-in">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg mb-6">
              <Share2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Welcome to FlashShare
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Instant room-based chat and file sharing. Join a room from the sidebar to get started.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl w-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Instant</h3>
              <p className="text-sm text-muted-foreground">No sign-up required. Just join and share.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Room-based</h3>
              <p className="text-sm text-muted-foreground">Create or join rooms for focused collaboration.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Private</h3>
              <p className="text-sm text-muted-foreground">Your messages stay local on your device.</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Select a room from the sidebar to start chatting
          </p>
        </div>
      </main>
    </div>
  );
}
