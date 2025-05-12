
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Settings, Award, LogOut, UserRoundCog } from 'lucide-react';
import ProgressBar from '@/components/gamification/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import TaskHistory from '@/components/profile/TaskHistory';
import Achievements from '@/components/profile/Achievements';
import Settings as SettingsComponent from '@/components/profile/Settings';
import ProfileSettings from '@/components/profile/ProfileSettings';

const Profile = () => {
  const navigate = useNavigate();
  const { profile, loading, signOut } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };
  
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Loading state
  if (loading) {
    return (
      <>
        <AppHeader />
        <div className="pt-16 pb-24 px-4 space-y-6 animate-fade-in">
          <div className="flex flex-col items-center justify-center mt-4">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-8 w-40 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
        <BottomNav />
      </>
    );
  }
  
  if (!profile) {
    navigate('/login');
    return null;
  }
  
  return (
    <>
      <AppHeader />
      
      <div className="pt-16 pb-24 px-4 space-y-6 animate-fade-in">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center mt-4">
          <Avatar className="h-24 w-24 mb-4 border-4 border-white/30">
            {profile.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
            ) : (
              <AvatarFallback className="bg-white/20 text-white text-2xl">
                {getInitials(profile.fullName)}
              </AvatarFallback>
            )}
          </Avatar>
          
          <h2 className="text-xl font-bold text-white">{profile.fullName}</h2>
          <p className="text-white/70">{profile.displayName}</p>
          
          <div className="mt-4 bg-white/20 rounded-full px-4 py-1 flex items-center space-x-1">
            <span className="text-white text-sm font-medium">Level {profile.level}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/50"></span>
            <span className="text-white/80 text-sm">{profile.experience}/100 XP</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in animate-delay-100">
          <Card className="glass-card p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white">{profile.tasksCompleted}</div>
            <div className="text-sm text-white/70">Tasks Completed</div>
          </Card>
          
          <Card className="glass-card p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-white">{profile.streak} 🔥</div>
            <div className="text-sm text-white/70">Day Streak</div>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-white/10">
            <TabsTrigger 
              value="profile" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Badges
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <TaskHistory />
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <Achievements />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <SettingsComponent />
          </TabsContent>
        </Tabs>
        
        <Button 
          variant="ghost" 
          className="w-full justify-center bg-white/10 hover:bg-white/20 text-white h-14"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Log Out</span>
        </Button>
        
        <div className="pt-4 text-center">
          <p className="text-white/40 text-sm">Task Eaze v1.0</p>
        </div>
      </div>
      
      <BottomNav />
    </>
  );
};

export default Profile;
