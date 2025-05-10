
import { useLocation, Link } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AppHeader = () => {
  const location = useLocation();
  
  // Determine page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/tasks') return 'My Tasks';
    if (path === '/profile') return 'Profile';
    return 'Task Eaze';
  };
  
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
              className="text-white rounded-full h-9 w-9 hover:bg-white/10"
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
