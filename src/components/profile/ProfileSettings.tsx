
import { useState } from 'react';
import { UserRoundCog } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const ProfileSettings = () => {
  const { profile, loading, updateProfile } = useUser();
  
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || '',
    displayName: profile?.displayName || '',
    bio: profile?.bio || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success('Profile updated successfully!');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <UserRoundCog className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Profile Settings</h2>
      </div>
      
      <Card className="glass-card p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center mb-4">
            <Avatar className="h-24 w-24 mb-4 border-4 border-white/30">
              {profile?.avatarUrl ? (
                <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
              ) : (
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  {profile ? getInitials(profile.fullName) : 'JD'}
                </AvatarFallback>
              )}
            </Avatar>
            
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => toast.info('Photo upload feature coming soon!')}
            >
              Change Photo
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-white">Display Title</Label>
            <Input
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-white">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-24"
              placeholder="Tell us a bit about yourself"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-white text-taskEaze-pink hover:bg-white/90"
          >
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSettings;
