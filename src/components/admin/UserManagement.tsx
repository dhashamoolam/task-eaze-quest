
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, UserPlus, User, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  user_metadata: any;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real app, you'd use an admin API or edge function to fetch users
        // For demo purposes, we'll simulate this with some mock data
        
        // This is just for demo - in a real app, you would fetch from your database
        const mockUsers = [
          {
            id: '1',
            email: 'user1@example.com',
            created_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            user_metadata: { name: 'User One' }
          },
          {
            id: '2',
            email: 'admin@admin.com',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            last_sign_in_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            user_metadata: { name: 'Admin User' }
          },
          {
            id: '3',
            email: 'user2@example.com',
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            last_sign_in_at: null,
            user_metadata: { name: 'User Two' }
          }
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.user_metadata?.name && user.user_metadata.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };
  
  const handleInviteUser = () => {
    toast.info('User invitation functionality would be implemented here');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Button 
          onClick={handleInviteUser}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Invite User
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-8 text-white/70">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-white/70">
          {searchQuery ? 'No users match your search' : 'No users found'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white">User</TableHead>
                <TableHead className="text-white">Created</TableHead>
                <TableHead className="text-white">Last Sign In</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-taskEaze-pink to-taskEaze-violet rounded-full p-1.5 text-white">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{user.email}</div>
                        {user.user_metadata?.name && (
                          <div className="text-sm text-white/60">{user.user_metadata.name}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70">{formatDate(user.created_at)}</TableCell>
                  <TableCell className="text-white/70">{formatDate(user.last_sign_in_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
