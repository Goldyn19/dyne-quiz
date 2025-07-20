import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockInvitations = [
  { id: "1", email: "alice@example.com", role: "member", status: "pending", sentAt: "2024-06-01" },
  { id: "2", email: "bob@example.com", role: "admin", status: "accepted", sentAt: "2024-05-30" },
  { id: "3", email: "carol@example.com", role: "member", status: "expired", sentAt: "2024-05-20" },
];

export function InvitationStatusTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Sent</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvitations.map(invite => (
                <tr key={invite.id} className="border-b last:border-0">
                  <td className="py-2 px-4">{invite.email}</td>
                  <td className="py-2 px-4 capitalize">{invite.role}</td>
                  <td className="py-2 px-4">
                    <Badge variant={invite.status === "pending" ? "secondary" : invite.status === "accepted" ? "secondary" : "outline"}>
                      {invite.status}
                    </Badge>
                  </td>
                  <td className="py-2 px-4">{invite.sentAt}</td>
                  <td className="py-2 px-4 space-x-2">
                    <Button size="sm" variant="outline">Resend</Button>
                    <Button size="sm" variant="destructive">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 