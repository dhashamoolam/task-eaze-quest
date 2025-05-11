
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Simulate login (would connect to backend in real app)
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="login-background min-h-screen flex flex-col justify-center items-center px-4 relative">
      <div className="animate-fade-in mb-10 flex flex-col items-center relative z-10">
        <img 
          src="/lovable-uploads/d5795639-4a84-4926-b6b3-f4422e179fb8.png" 
          alt="Task Eaze Logo" 
          className="h-32 w-32 animate-pulse-soft"
        />
        <h1 className="text-3xl font-bold mt-4 text-white">Task Eaze</h1>
        <p className="text-white/80 mt-2">Accomplish more, with ease</p>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-lg w-full max-w-md p-6 animate-fade-in animate-delay-200 relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Welcome Back!</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="••••••••"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
          >
            Login
          </Button>
        </form>
        
        <div className="mt-6 text-center text-white/80">
          <p>Don't have an account? 
            <button 
              onClick={() => navigate('/register')} 
              className="text-pink-400 font-medium ml-1 underline underline-offset-2"
            >
              Register
            </button>
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/dashboard')} 
        className="mt-6 text-white/70 text-sm underline underline-offset-2 animate-fade-in animate-delay-300 relative z-10"
      >
        Continue as guest
      </button>
    </div>
  );
};

export default LoginPage;
