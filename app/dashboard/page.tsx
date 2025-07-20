"use client";

import { AppNavigation } from "@/components/custom/app-navigation";
import { useSession } from "next-auth/react";
import { AdminDashboard } from "@/components/custom/admin-dashboard";
import { MemberDashboard } from "@/components/custom/member-dashboard";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  console.log("User Role:", userRole);

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      
      <div className="pt-16">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {userRole === "admin" ? "📊 Admin Dashboard" : "📊 Member Dashboard"}
            </h1>
            <p className="text-muted-foreground">
              {userRole === "admin" 
                ? "Manage your organization's quizzes, users, and results"
                : "Track your quiz performance and achievements"
              }
            </p>
          </div>

          {/* Render appropriate dashboard based on role */}
          {userRole === "admin" ? (
            <AdminDashboard />
          ) : (
            <MemberDashboard />
          )}
        </div>
      </div>
    </div>
  );
} 