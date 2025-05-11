
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import UserManagement from '@/components/admin/UserManagement';
import AppSettings from '@/components/admin/AppSettings';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // For the hardcoded admin implementation we don't need to check the session
        // We're using a simpler approach with specific credentials
        // Admin check is done during login in LoginPage.tsx
        
        // Simulate admin check for demo purposes
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="dashboard-background min-h-screen flex flex-col items-center justify-center">
        <img 
          src="/lovable-uploads/d5795639-4a84-4926-b6b3-f4422e179fb8.png" 
          alt="Task Eaze Logo" 
          className="h-24 w-24 animate-pulse-soft" 
        />
        <h1 className="text-white text-xl font-bold mt-4">Task Eaze Admin</h1>
        <p className="text-white/60 mt-2">Verifying admin permissions...</p>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="dashboard-background min-h-screen pb-20 pt-16">
      <AppHeader />
      
      <main className="container px-4 py-6 max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col gap-6">
          <Card className="bg-black/30 backdrop-blur-md border border-white/10 text-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-taskEaze-pink/30 to-taskEaze-violet/30 pb-3">
              <CardTitle className="text-xl">Admin Panel</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="bg-black/50 w-full justify-start rounded-none border-b border-white/10">
                  <TabsTrigger value="users" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                    Settings
                  </TabsTrigger>
                </TabsList>
                <div className="p-4">
                  <TabsContent value="users" className="mt-0">
                    <UserManagement />
                  </TabsContent>
                  <TabsContent value="settings" className="mt-0">
                    <AppSettings />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Admin;
