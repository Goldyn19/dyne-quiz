import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockMembers = [
  { id: "1", name: "Alice Smith", email: "alice@example.com", role: "admin" },
  { id: "2", name: "Bob Johnson", email: "bob@example.com", role: "member" },
  { id: "3", name: "Carol Lee", email: "carol@example.com", role: "member" },
];

export function OrganizationMembersTable() {
  const [members, setMembers] = useState(mockMembers);

  function handleRemove(id: string) {
    setMembers(members.filter(m => m.id !== id));
  }

  function handleChangeRole(id: string) {
    setMembers(members => members.map(m => m.id === id ? { ...m, role: m.role === "admin" ? "member" : "admin" } : m));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-b last:border-0">
                  <td className="py-2 px-4">{member.name}</td>
                  <td className="py-2 px-4">{member.email}</td>
                  <td className="py-2 px-4">
                    <Badge variant={member.role === "admin" ? "secondary" : "outline"}>{member.role}</Badge>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleChangeRole(member.id)}>
                      {member.role === "admin" ? "Make Member" : "Make Admin"}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleRemove(member.id)}>
                      Remove
                    </Button>
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