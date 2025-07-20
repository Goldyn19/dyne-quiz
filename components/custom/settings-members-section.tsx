import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, MoreVertical, X } from "lucide-react";

const MEMBERS_PER_PAGE = 4;
const mockMembers = [
  {
    id: 1,
    name: "Chad Bosewick",
    email: "ChadBoseW@gmail.com",
    role: "Guest",
    avatar: "/avatar1.jpg",
  },
  {
    id: 2,
    name: "Somtochukwu Nwobodo",
    email: "SomtoNwobodo@gmail.com",
    role: "Admin",
    avatar: "/avatar1.jpg",
  },
  {
    id: 3,
    name: "Aishat Salami",
    email: "AlishatSalami@gmail.com",
    role: "Admin",
    avatar: "/avatar1.jpg",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Guest",
    avatar: "/avatar1.jpg",
  },
  {
    id: 5,
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    avatar: "/avatar1.jpg",
  },
  {
    id: 6,
    name: "Mary Major",
    email: "mary@example.com",
    role: "Guest",
    avatar: "/avatar1.jpg",
  },
  // Add more as needed
];

function InvitePopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Guest");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-card rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-muted-foreground"
          onClick={onClose}
        >
          <X />
        </button>
        <h3 className="text-lg font-bold mb-4">Invite to Admin System</h3>
        <div className="mb-4">
          <label className="block text-base font-medium mb-2">Email</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg bg-background text-base"
            placeholder="email@example.com, email2@example.com..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-base font-medium mb-2">Role</label>
          <select
            className="w-full px-4 py-3 border rounded-lg bg-background text-base"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Guest">Guest</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary text-sm flex items-center gap-1">
            <Copy className="w-4 h-4" /> Invite with link
          </span>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
            Send invites
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SettingsMembersSection() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteLinkEnabled, setInviteLinkEnabled] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [page, setPage] = useState(1);

  // Filter and paginate members
  const filtered = mockMembers.filter(
    (m) =>
      (roleFilter === "All" || m.role === roleFilter) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / MEMBERS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * MEMBERS_PER_PAGE,
    page * MEMBERS_PER_PAGE
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Members</h2>
      <p className="text-lg text-muted-foreground mb-6">
        Manage who has access to this workspace
      </p>
      <hr className="mb-6" />
      {/* Invite Link */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold mb-1">Invite Link</div>
          <div className="text-muted-foreground text-sm mb-2">
            This provides a unique URL that allows anyone to join your workspace
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg bg-background text-base"
              value="https://www.figma.com/design/7hcSTNzQOJLl9aww6wEEd1/Managing-Users----Team-Learn-AI?node-i"
              readOnly
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 flex items-center gap-2">
              <Copy className="w-4 h-4" /> Copy link
            </Button>
          </div>
        </div>
        <div className="md:ml-4 flex flex-col items-center md:items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inviteLinkEnabled}
              onChange={() => setInviteLinkEnabled((v) => !v)}
              className="accent-primary w-5 h-5"
            />
            <span className="text-base">Enable</span>
          </label>
        </div>
      </div>
      {/* Manage Members */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="text-base font-semibold">Manage members</div>
          <Button
            className="bg-primary hover:bg-primary text-primary-foreground px-6 w-full sm:w-auto"
            onClick={() => setInviteOpen(true)}
          >
            Invite people
          </Button>
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          On the Free plan all members in a workspace are administrators.
          Upgrade to a paid plan to add the ability to assign or remove
          administrator roles.{" "}
          <span className="text-primary cursor-pointer">
            Go to Plans &rarr;
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
          <input
            type="text"
            className="px-4 py-3 border rounded-lg bg-background text-base w-full sm:w-72"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="px-4 py-3 border rounded-lg bg-background text-base w-full sm:w-auto"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All</option>
            <option value="Admin">Admin</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
        <div className="mb-4 text-base font-medium">
          {filtered.length} active member{filtered.length !== 1 ? "s" : ""}
        </div>
        <div className="flex flex-col gap-4">
          {paginated.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No members found.
            </div>
          )}
          {paginated.map((member) => (
            <div
              key={member.id}
              className="flex justify-between items-center bg-card rounded-lg border border-border px-4 py-3 max-w-5xl w-full"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-base truncate">
                    {member.name}
                  </span>
                  <span className="text-muted-foreground text-sm truncate">
                    {member.email}
                  </span>
                </div>
              </div>

              {/* Center: Role Select */}
              <div>
                <select
                  className="px-2 py-1 border rounded bg-background text-base"
                  value={member.role}
                  disabled
                >
                  <option value="Admin">Admin</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>

              {/* Right: More Icon */}
              <div>
                <MoreVertical className="w-5 h-5 text-muted-foreground cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      {/* Export Members List */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4">
        <div>
          <div className="font-medium mb-1">Export Members List</div>
          <div className="text-muted-foreground text-sm">
            Export a CSV with information of all members of your team
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary text-primary-foreground px-6 w-full sm:w-auto">
          Export CSV
        </Button>
      </div>
      <InvitePopup open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}
