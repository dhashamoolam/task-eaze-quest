
import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const Settings = () => {
  const { profile, loading } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState('en');
  
  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast.success(`Notifications ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    toast.success(`Dark mode ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleToggleSoundEffects = (checked: boolean) => {
    setSoundEffects(checked);
    toast.success(`Sound effects ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Language changed to ${value === 'en' ? 'English' : value === 'es' ? 'Spanish' : 'French'}`);
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
        <SettingsIcon className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Settings</h2>
      </div>
      
      <Card className="glass-card p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="notifications" className="text-white text-base">Notifications</Label>
            <p className="text-white/60 text-xs">Get notified about upcoming tasks and achievements</p>
          </div>
          <Switch 
            id="notifications" 
            checked={notificationsEnabled} 
            onCheckedChange={handleToggleNotifications} 
            className="data-[state=checked]:bg-taskEaze-pink"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="darkMode" className="text-white text-base">Dark Mode</Label>
            <p className="text-white/60 text-xs">Switch between light and dark themes</p>
          </div>
          <Switch 
            id="darkMode" 
            checked={darkMode} 
            onCheckedChange={handleToggleDarkMode} 
            className="data-[state=checked]:bg-taskEaze-pink"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="soundEffects" className="text-white text-base">Sound Effects</Label>
            <p className="text-white/60 text-xs">Play sounds for task completion and achievements</p>
          </div>
          <Switch 
            id="soundEffects" 
            checked={soundEffects} 
            onCheckedChange={handleToggleSoundEffects} 
            className="data-[state=checked]:bg-taskEaze-pink"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language" className="text-white text-base">Language</Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger 
              id="language" 
              className="w-full bg-white/10 border-white/20 text-white"
            >
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
