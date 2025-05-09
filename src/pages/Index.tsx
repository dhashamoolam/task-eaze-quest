
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LoginPage from '@/components/auth/LoginPage';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate checking if user is logged in
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Render loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img 
          src="/lovable-uploads/ec6bb95d-0100-4968-9de5-c6a0bd9d84f7.png" 
          alt="Task Eaze Logo" 
          className="h-24 w-24 animate-pulse" 
        />
        <h1 className="text-white text-xl font-bold mt-4">Task Eaze</h1>
        <p className="text-white/60 mt-2">Loading your tasks...</p>
      </div>
    );
  }
  
  return <LoginPage />;
};

export default Index;
