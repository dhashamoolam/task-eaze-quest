
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type UserProfile = {
  id: string;
  fullName: string;
  displayName: string;
  bio: string;
  level: number;
  experience: number;
  tasksCompleted: number;
  streak: number;
  avatarUrl?: string;
}

type UserContextType = {
  profile: UserProfile | null;
  loading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
};

const defaultProfile: UserProfile = {
  id: '1',
  fullName: 'John Doe',
  displayName: 'Productivity Enthusiast',
  bio: 'I love staying organized and productive!',
  level: 1,
  experience: 70,
  tasksCompleted: 12,
  streak: 3,
  avatarUrl: undefined
};

const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  updateProfile: async () => {},
  signOut: async () => {}
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile data when component mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // In a real app, we would fetch the user profile from Supabase here
          // For now, we'll use the default profile data
          setProfile({
            ...defaultProfile,
            id: session.user.id
          });
        } else {
          // Use demo profile for now
          setProfile(defaultProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Update profile information
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;
    
    try {
      // Update local state immediately for a responsive UI
      setProfile({ ...profile, ...updates });
      
      // In a real app, we would update the profile in Supabase here
      // For example:
      // const { error } = await supabase
      //   .from('profiles')
      //   .update(updates)
      //   .eq('id', profile.id);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <UserContext.Provider value={{ profile, loading, updateProfile, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
