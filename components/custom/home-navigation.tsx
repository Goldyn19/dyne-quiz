"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">Quiz Together</span>
          <span className="text-lg font-bold text-foreground sm:hidden">QT</span>
        </div>
        {/* Section Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
          <a href="#stats" className="text-foreground hover:text-primary transition-colors">Stats</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
} 