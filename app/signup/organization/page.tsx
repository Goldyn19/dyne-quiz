"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

// Helper to slugify a string
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^a-z0-9\-]/g, '')    // Remove all non-alphanumeric except -
    .replace(/-+/g, '-')             // Replace multiple - with single -
    .replace(/^-+|-+$/g, '');        // Trim - from start/end
}

export default function OrganizationOnboarding() {
  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [inviteToken, setInviteToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const router = useRouter() 

  const accessToken = session?.accessToken;

 async function handleCreate() {
  setLoading(true);
  setMessage(null);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/organization/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: orgName, slug: slugify(orgDescription) }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage("Failed to create organization");
      throw new Error("Failed to create organization");
    }

    // ✅ Update session with org details
    const updated = await update({
      organization: {
        orgId: data.id?.toString(),
        orgName: data.name,
        role: "admin", // or whatever is appropriate
      },
    });

    console.log("Updated session:", updated);

    setMessage("Organization created! Redirecting to dashboard...");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  } catch (error) {
    setMessage("Error creating organization: " + error);
    setLoading(false);
  }
}


  async function handleJoin() {
    setLoading(true);
    setMessage(null);
    // TODO: Call API to join org with token
    setTimeout(() => {
      setLoading(false);
      setMessage("Joined organization! Redirecting to dashboard...");
      // TODO: Redirect to dashboard
    }, 1000);
  }

  if (mode === "create") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="bg-card rounded-xl shadow max-w-md w-full px-8 py-10 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Create Organization</h2>
          <input
            className="w-full border border-border rounded px-3 py-2 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Organization Name"
            value={orgName}
            onChange={e => setOrgName(e.target.value)}
          />
          <textarea
            className="w-full border border-border rounded px-3 py-2 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Organization Description (optional)"
            value={orgDescription}
            onChange={e => setOrgDescription(e.target.value)}
            rows={3}
          />
          <Button className="w-full mb-2" onClick={handleCreate} disabled={loading || !orgName}>
            {loading ? "Creating..." : "Create"}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setMode("choose")}>
            Back
          </Button>
          {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
        </div>
      </div>
    );
  }

  if (mode === "join") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="bg-card rounded-xl shadow max-w-md w-full px-8 py-10 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Join Organization</h2>
          <input
            className="w-full border border-border rounded px-3 py-2 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Invitation Token"
            value={inviteToken}
            onChange={e => setInviteToken(e.target.value)}
          />
          <Button className="w-full mb-2" onClick={handleJoin} disabled={loading || !inviteToken}>
            {loading ? "Joining..." : "Join"}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setMode("choose")}>
            Back
          </Button>
          {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
        </div>
      </div>
    );
  }

  // Choose mode
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-card rounded-xl shadow max-w-md w-full px-8 py-10 border border-border flex flex-col items-center">
        {/* Logo */}
        <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">Q</span>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
          Welcome to Quiz Together!<br />
          <span className="text-base font-normal text-muted-foreground block mt-2">
            Get started by creating a new organization or joining an existing one.
          </span>
        </h2>
        <Button className="w-full mb-4" onClick={() => setMode("create")}>Create a New Organization</Button>
        <Button className="w-full" onClick={() => setMode("join")}>Join an Existing Organization</Button>
      </div>
    </div>
  );
} 