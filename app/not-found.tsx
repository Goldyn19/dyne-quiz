"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="bg-card rounded-xl shadow max-w-md w-full px-8 py-10 border border-border flex flex-col items-center">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-3xl">Q</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2 text-center">Page Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/">
          <Button className="w-full">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  );
} 