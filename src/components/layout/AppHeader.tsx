
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

const AppHeader = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Determine page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/tasks') return 'My Tasks';
    if (path === '/profile') return 'Profile';
    if (path === '/admin') return 'Admin Panel';
    return 'Task Eaze';
  };
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // In a real app, you'd check for admin role in your database
          // For now, we'll simulate this with a simple check
          // Later this would be replaced with a proper role check
          const userEmail = session.user.email;
          const adminCheck = userEmail?.endsWith('@admin.com') || true; // For demo, all are admins
          setIsAdmin(adminCheck);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    
    checkAdminStatus();
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-taskEaze-pink/90 to-taskEaze-violet/90 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback className="bg-white/20 text-white">TE</AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-bold text-white">{getPageTitle()}</h1>
        </div>
        
        <div className="flex space-x-1">
          {isAdmin && (
            <Link to="/admin">
              <Button 
                size="icon" 
                variant="ghost" 
                className={`text-white rounded-full h-9 w-9 hover:bg-white/10 ${
                  location.pathname === '/admin' ? 'bg-white/20' : ''
                }`}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-white rounded-full h-9 w-9 hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/profile">
            <Button 
              size="icon" 
              variant="ghost" 
              className={`text-white rounded-full h-9 w-9 hover:bg-white/10 ${
                location.pathname === '/profile' ? 'bg-white/20' : ''
              }`}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
