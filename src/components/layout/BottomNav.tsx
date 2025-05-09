
import { Home, ListTodo, Plus, User } from 'lucide-react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AddTaskForm from '../tasks/AddTaskForm';
import { Task } from '@/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface BottomNavProps {
  onAddTask?: (task: Task) => void;
}

const BottomNav = ({ onAddTask }: BottomNavProps) => {
  const location = useLocation();
  const [showAddTask, setShowAddTask] = useState(false);
  
  // Handle add task form submission
  const handleAddTask = (task: Task) => {
    if (onAddTask) {
      onAddTask(task);
    } else {
      toast.error("Sorry, couldn't add task right now");
    }
    setShowAddTask(false);
  };
  
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-taskEaze-pink/90 to-taskEaze-violet/90 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around px-6 py-2">
          <Link 
            to="/dashboard" 
            className={`nav-item ${location.pathname === '/dashboard' ? 'nav-item-active' : 'text-white/60'}`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            to="/tasks" 
            className={`nav-item ${location.pathname === '/tasks' ? 'nav-item-active' : 'text-white/60'}`}
          >
            <ListTodo className="h-5 w-5" />
            <span className="text-xs mt-1">Tasks</span>
          </Link>
          
          <button 
            onClick={() => setShowAddTask(true)}
            className="bg-white rounded-full p-3 -mt-6 shadow-lg text-taskEaze-violet transform hover:scale-105 transition-transform"
          >
            <Plus className="h-6 w-6" />
          </button>
          
          <Link 
            to="/profile" 
            className={`nav-item ${location.pathname === '/profile' ? 'nav-item-active' : 'text-white/60'}`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
      
      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="p-0 bg-gradient-to-br from-taskEaze-pink to-taskEaze-violet border-none max-w-md">
          <AddTaskForm 
            onAddTask={handleAddTask} 
            onCancel={() => setShowAddTask(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BottomNav;
