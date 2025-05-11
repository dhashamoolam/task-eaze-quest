
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Simulate registration (would connect to backend in real app)
    toast.success('Registration successful!');
    navigate('/dashboard');
  };

  return (
    <div className="login-background min-h-screen flex flex-col justify-center items-center px-4 relative">
      <div className="animate-fade-in mb-8 flex flex-col items-center relative z-10">
        <img 
          src="/lovable-uploads/d5795639-4a84-4926-b6b3-f4422e179fb8.png" 
          alt="Task Eaze Logo" 
          className="h-24 w-24 animate-pulse-soft"
        />
        <h1 className="text-2xl font-bold mt-3 text-white">Join Task Eaze</h1>
      </div>
      
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-lg w-full max-w-md p-6 animate-fade-in animate-delay-100 relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Create Your Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="Your Name"
            />
          </div>
          
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
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="••••••••"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
          >
            Register
          </Button>
        </form>
        
        <div className="mt-6 text-center text-white/80">
          <p>Already have an account? 
            <button 
              onClick={() => navigate('/login')} 
              className="text-pink-400 font-medium ml-1 underline underline-offset-2"
            >
              Login
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

export default RegisterPage;
