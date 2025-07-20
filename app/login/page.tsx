"use client";
import { Navigation } from "@/components/custom/navigation";
import { LoginForm } from "@/components/custom/login-form";
import { Suspense } from "react";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">Q</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue your quiz journey
              </p>
            </div>

            <Suspense fallback={<p>Loading login form...</p>}>
              <LoginForm />
            </Suspense>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don`&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
