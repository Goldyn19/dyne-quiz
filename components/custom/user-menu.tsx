"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" className="text-foreground hover:text-primary text-xs md:text-sm px-2 md:px-4">
          <a href="/login">Sign In</a>
        </Button>
        <Button className="text-xs md:text-sm px-2 md:px-4">
          <a href="/signup">Get Started</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {session.user.username?.[0] || session.user.email?.[0] || "U"}
          </span>
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-foreground">
            {session.user.username}
          </p>
          <p className="text-xs text-muted-foreground">
            {session.user.email}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-2">
        <Badge variant="secondary" className="text-xs hidden sm:block">
          {session.user.username}
        </Badge>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-xs px-2 md:px-3"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
} 