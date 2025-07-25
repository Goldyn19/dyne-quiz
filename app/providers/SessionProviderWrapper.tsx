"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function OrgRedirectGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    console.log("Session data:", session);

    // 🚨 Don't redirect if we're already on the org signup page
    if (
      session &&
      (!session.organization || !session.organization.orgId) &&
      pathname !== "/signup/organization"
    ) {
      setRedirecting(true);
      router.push("/signup/organization");
    }
  }, [session, status, pathname, router]);

  if (status === "loading" || redirecting) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <OrgRedirectGuard>{children}</OrgRedirectGuard>
    </SessionProvider>
  );
}
