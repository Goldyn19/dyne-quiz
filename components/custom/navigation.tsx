import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "./user-menu";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl font-bold text-foreground">Quiz Together</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="/profile" className="text-foreground hover:text-primary transition-colors">
              Profile
            </a>
          </div>

          {/* User Menu / CTA Buttons */}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
} 