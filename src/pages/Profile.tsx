
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

const Profile = () => {
  const navigate = useNavigate();
  const { profile, loading, updateProfile, signOut } = useUser();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    bio: ''
  });
  
  // Handle profile data editing
  const handleEditProfile = () => {
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        displayName: profile.displayName,
        bio: profile.bio || ''
      });
      setShowEditProfile(true);
    }
  };
  
  // Save profile updates
  const handleSaveProfile = () => {
    updateProfile({
      fullName: formData.fullName,
      displayName: formData.displayName,
      bio: formData.bio
    });
    setShowEditProfile(false);
  };
  
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
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditProfile}
            className="mt-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <UserRoundCog className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
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
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </Button>
        </div>
        
        <div className="pt-4 text-center">
          <p className="text-white/40 text-sm">Task Eaze v1.0</p>
        </div>
      </div>
      
      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="bg-gradient-to-br from-taskEaze-pink to-taskEaze-violet border-none">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-white">Display Title</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-24"
                placeholder="Tell us a bit about yourself"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowEditProfile(false)}
              className="text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="bg-white text-taskEaze-pink hover:bg-white/90"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNav />
    </>
  );
};

export default Profile;
