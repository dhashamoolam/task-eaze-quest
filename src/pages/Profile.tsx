
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Settings, Award, LogOut } from 'lucide-react';
import ProgressBar from '@/components/gamification/ProgressBar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [level] = useState(1);
  const [experience] = useState(70);
  const [tasksCompleted] = useState(12);
  const [streak] = useState(3);
  
  return (
    <>
      <AppHeader />
      
      <div className="pt-16 pb-24 px-4 space-y-6 animate-fade-in">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center mt-4">
          <Avatar className="h-24 w-24 mb-4 border-4 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-bold text-white">John Doe</h2>
          <p className="text-white/70">Productivity Enthusiast</p>
          
          <div className="mt-4 bg-white/20 rounded-full px-4 py-1 flex items-center space-x-1">
            <span className="text-white text-sm font-medium">Level {level}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/50"></span>
            <span className="text-white/80 text-sm">{experience}/100 XP</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in animate-delay-100">
          <Card className="glass-card p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white">{tasksCompleted}</div>
            <div className="text-sm text-white/70">Tasks Completed</div>
          </Card>
          
          <Card className="glass-card p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white">{streak} 🔥</div>
            <div className="text-sm text-white/70">Day Streak</div>
          </Card>
        </div>
        
        {/* Menu Items */}
        <div className="space-y-3 animate-fade-in animate-delay-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-white/10 hover:bg-white/20 text-white h-14"
          >
            <Calendar className="h-5 w-5 mr-3" />
            <span>Task History</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-white/10 hover:bg-white/20 text-white h-14"
          >
            <Award className="h-5 w-5 mr-3" />
            <span>Achievements</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-white/10 hover:bg-white/20 text-white h-14"
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-white/10 hover:bg-white/20 text-white h-14"
            onClick={() => navigate('/')}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </Button>
        </div>
        
        <div className="pt-4 text-center">
          <p className="text-white/40 text-sm">Task Eaze v1.0</p>
        </div>
      </div>
      
      <BottomNav />
    </>
  );
};

export default Profile;
