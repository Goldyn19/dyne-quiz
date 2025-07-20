import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function SettingsGeneralForm() {
  const [username, setUsername] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  return (
    <form className="max-w-5xl">
      <div className="flex items-center gap-12 mb-12">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground mb-3">CN</div>
          <label className="text-primary font-semibold cursor-pointer text-base">
            Upload your photo
            <input type="file" className="hidden" />
          </label>
          <span className="text-sm text-muted-foreground mt-2">Photos help your teammates recognize you.</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Username</label>
          <input type="text" className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Pronouns</label>
          <select className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14" value={pronouns} onChange={e => setPronouns(e.target.value)}>
            <option value="">Select</option>
            <option value="he/him">He/Him</option>
            <option value="she/her">She/Her</option>
            <option value="they/them">They/Them</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Your job title</label>
          <input type="text" className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Enter job title" />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Department or team</label>
          <input type="text" className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14" value={department} onChange={e => setDepartment(e.target.value)} placeholder="Enter department or team" />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Your email address</label>
        <input type="email" className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Bio</label>
        <textarea className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground min-h-[80px]" value={bio} onChange={e => setBio(e.target.value)} placeholder="Type your message here" maxLength={64} />
        <div className="text-sm text-muted-foreground mt-2">Maximum of 64 characters</div>
      </div>
      <div className="flex gap-4 mt-8">
        <Button type="button" variant="outline" className="h-12 px-8 text-lg">Cancel</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-lg">Save Changes</Button>
      </div>
    </form>
  );
} 