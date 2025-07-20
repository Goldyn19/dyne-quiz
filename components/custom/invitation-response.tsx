'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InvitationResponse({ token }: { token: string }) {
  // Mock invitation state
  const [status, setStatus] = useState<"pending" | "accepted" | "declined" | "expired">("pending");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleAction(action: "accept" | "decline") {
    setLoading(true);
    setMessage(null);
    // Simulate API call
    setTimeout(() => {
      if (action === "accept") {
        setStatus("accepted");
        setMessage("You have joined the organization!");
      } else {
        setStatus("declined");
        setMessage("You have declined the invitation.");
      }
      setLoading(false);
    }, 1000);
  }

  if (status === "expired") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invitation Expired</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">This invitation link has expired. Please contact your admin for a new invitation.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Invitation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">You have been invited to join an organization.</p>
        {status === "pending" && (
          <div className="flex space-x-4">
            <Button onClick={() => handleAction("accept") } disabled={loading}>
              {loading ? "Joining..." : "Accept"}
            </Button>
            <Button variant="outline" onClick={() => handleAction("decline") } disabled={loading}>
              {loading ? "Declining..." : "Decline"}
            </Button>
          </div>
        )}
        {message && <div className="mt-4 text-green-600">{message}</div>}
        {status !== "pending" && !message && (
          <div className="mt-4 text-muted-foreground">This invitation has already been responded to.</div>
        )}
      </CardContent>
    </Card>
  );
} 