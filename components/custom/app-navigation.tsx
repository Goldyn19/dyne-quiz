"use client";

import { useState } from "react";
import Link from "next/link";
import { UserMenu } from "./user-menu";

export function AppNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Left: Hamburger + QT (Mobile Only) */}
        <div className="flex md:hidden items-center gap-2">
          <button
            aria-label="Open navigation menu"
            className="p-2 focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-lg font-bold text-foreground">QT</span>
        </div>
        {/* Logo (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-2 flex-1">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-bold text-foreground">Quiz Together</span>
        </div>
        {/* App Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/settings" className="text-foreground hover:text-primary transition-colors">Settings</Link>
          <Link href="/quiz" className="text-foreground hover:text-primary transition-colors">Quiz</Link>
        </div>
        {/* User Menu (right) */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <UserMenu />
        </div>
      </div>
      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-lg animate-fade-in-down">
          <div className="flex flex-col py-2">
            <Link href="/dashboard" className="px-6 py-3 text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
            <Link href="/settings" className="px-6 py-3 text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Settings
            </Link>
            <Link href="/quiz" className="px-6 py-3 text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Quiz
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 