import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { Search, Plus, Trash2, Edit2, Shield, UserCheck, Filter, MoreVertical, X, Check } from 'lucide-react';

interface UserTableProps {
  users: User[];
  onAddUser: (user: Partial<User>) => void;
  onUpdateUser: (id: number, user: Partial<User>) => void;
  onDeleteUser: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: UserRole;
    status: 'Online' | 'Offline' | 'Busy';
  }>({
    name: '',
    email: '',
    role: 'developer',
    status: 'Online'
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'developer', status: 'Online' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      onUpdateUser(editingUser.id, formData);
    } else {
      onAddUser(formData);
    }
    setIsModalOpen(false);
  };

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-950/60 text-purple-400 border-purple-500/30';
      case 'developer':
        return 'bg-cyan-950/60 text-[#00D4FF] border-cyan-500/30';
      case 'editor':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls matching Screenshot 6 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
            User Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage organization team members, access roles, and status.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 rounded-lg bg-[#00D4FF] hover:bg-[#33DDFF] text-[#0A192F] font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00D4FF]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#00D4FF]"
          >
            <option value="ALL">All Roles</option>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* User Table matching Screenshot 6 */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240]">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3.5 px-4 font-semibold">User Details</th>
              <th className="py-3.5 px-4 font-semibold">Role</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold">Joined Date</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#0A192F] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-slate-800 dark:text-white font-mono text-xs shrink-0">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{u.email}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase ${getRoleBadgeClass(u.role)}`}>
                    {u.role}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        u.status === 'Online'
                          ? 'bg-emerald-400 animate-pulse'
                          : u.status === 'Busy'
                          ? 'bg-amber-400'
                          : 'bg-slate-500'
                      }`}
                    />
                    {u.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400">{u.createdAt}</td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditModal(u)}
                      className="p-1.5 rounded text-slate-400 hover:text-[#00D4FF] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit User"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteUser(u.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0A192F] border border-slate-800 text-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base font-sans">
                {editingUser ? 'Edit User Credentials' : 'Create New User'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF]"
                  >
                    <option value="admin">admin</option>
                    <option value="developer">developer</option>
                    <option value="editor">editor</option>
                    <option value="viewer">viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#112240] border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-[#00D4FF]"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#00D4FF] text-[#0A192F] font-bold"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
