
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const AppSettings = () => {
  const [appName, setAppName] = useState('Task Eaze');
  const [appDescription, setAppDescription] = useState('Accomplish more, with ease');
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your database
    toast.success('Settings saved successfully');
  };
  
  const toggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    toast.info(`Maintenance mode ${!maintenanceMode ? 'enabled' : 'disabled'}`);
  };
  
  return (
    <div className="space-y-4">
      <Card className="bg-black/20 border-white/10">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-medium text-white">General Settings</h3>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="appName" className="text-white/90">App Name</Label>
              <Input
                id="appName"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appDescription" className="text-white/90">App Description</Label>
              <Textarea
                id="appDescription"
                value={appDescription}
                onChange={(e) => setAppDescription(e.target.value)}
                className="bg-white/5 border-white/10 text-white min-h-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/20 border-white/10">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-medium text-white">User & Authentication</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="allowRegistration" className="text-white/90 flex-grow">
                Allow New Registrations
                <span className="block text-xs text-white/60">If disabled, only admins can create new users</span>
              </Label>
              <Switch
                id="allowRegistration"
                checked={allowRegistration}
                onCheckedChange={setAllowRegistration}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications" className="text-white/90 flex-grow">
                Email Notifications
                <span className="block text-xs text-white/60">Send email notifications for task updates</span>
              </Label>
              <Switch
                id="emailNotifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/20 border-white/10">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-medium text-white">System</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90">Maintenance Mode</p>
              <p className="text-sm text-white/60">
                {maintenanceMode 
                  ? "Your app is currently in maintenance mode. Only admins can access it."
                  : "Your app is currently accessible to all users."}
              </p>
            </div>
            <Button 
              onClick={toggleMaintenanceMode}
              variant={maintenanceMode ? "destructive" : "outline"}
              size="sm"
            >
              {maintenanceMode ? "Disable" : "Enable"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
          Discard Changes
        </Button>
        <Button 
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AppSettings;
