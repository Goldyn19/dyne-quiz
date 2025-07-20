import { useState } from 'react';
import { Button } from '@/components/ui/button';

const roles = [
  {
    key: 'superadmin',
    name: 'Super Admin',
    description: 'Full control and Full Permissions',
  },
  {
    key: 'admin',
    name: 'Admin',
    description: 'Full control and Limited Permissions',
  },
  {
    key: 'user',
    name: 'User',
    description: 'Limited Control and Limited Permissions',
  },
] as const;

type RoleKey = typeof roles[number]['key'];
type PermissionKey =
  | 'Can view transactions'
  | 'Can view refunds'
  | 'Can log refunds'
  | 'Can view users'
  | 'Can create users'
  | 'Can edit users'
  | 'Can blacklist/whitelist users';

type PermissionsState = {
  [key in RoleKey]: {
    [perm in PermissionKey]: boolean;
  };
};

const defaultPermissions: PermissionsState = {
  superadmin: {
    'Can view transactions': true,
    'Can view refunds': true,
    'Can log refunds': true,
    'Can view users': true,
    'Can create users': true,
    'Can edit users': true,
    'Can blacklist/whitelist users': true,
  },
  admin: {
    'Can view transactions': true,
    'Can view refunds': true,
    'Can log refunds': false,
    'Can view users': true,
    'Can create users': true,
    'Can edit users': true,
    'Can blacklist/whitelist users': false,
  },
  user: {
    'Can view transactions': false,
    'Can view refunds': false,
    'Can log refunds': false,
    'Can view users': true,
    'Can create users': false,
    'Can edit users': false,
    'Can blacklist/whitelist users': false,
  },
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-primary' : 'bg-muted'}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`}
      />
    </button>
  );
}

export function SettingsRolesSection() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('superadmin');
  const [permissions, setPermissions] = useState<PermissionsState>({ ...defaultPermissions });

  const handleToggle = (perm: PermissionKey) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [perm]: !prev[selectedRole][perm],
      },
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Roles List */}
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-2 mt-8">Roles</h2>
        <p className="text-muted-foreground mb-6">Manage user roles for members</p>
        <div className="flex flex-col gap-2">
          {roles.map(role => (
            <button
              key={role.key}
              className={`text-left rounded-lg border px-6 py-4 mb-1 transition-colors font-medium ${selectedRole === role.key ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:bg-muted'}`}
              onClick={() => setSelectedRole(role.key)}
            >
              <div className="text-base font-semibold mb-1">{role.name}</div>
              <div className={`text-sm ${selectedRole === role.key ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{role.description}</div>
            </button>
          ))}
        </div>
        <Button className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">+ Create roles</Button>
      </div>
      {/* Permissions List */}
      <div className="flex-1">
        <div className="border rounded-xl bg-card px-8 py-8 mt-16 lg:mt-8">
          <div className="text-lg font-semibold mb-6">Permissions</div>
          <div className="text-muted-foreground mb-6 text-sm">See the list of permissions for this role</div>
          <div className="flex flex-col gap-6">
            {Object.entries(permissions[selectedRole]).map(([perm, value]) => (
              <div key={perm} className="flex items-center justify-between">
                <span className="text-base">{perm}</span>
                <Toggle checked={!!value} onChange={() => handleToggle(perm as PermissionKey)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 