
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
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="animate-fade-in mb-8 flex flex-col items-center">
        <img 
          src="/lovable-uploads/ec6bb95d-0100-4968-9de5-c6a0bd9d84f7.png" 
          alt="Task Eaze Logo" 
          className="h-24 w-24"
        />
        <h1 className="text-2xl font-bold mt-3 text-white">Join Task Eaze</h1>
      </div>
      
      <div className="glass-card w-full max-w-md p-6 animate-fade-in animate-delay-100">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Create Your Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              placeholder="Your Name"
            />
          </div>
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
              placeholder="••••••••"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-white text-taskEaze-violet hover:bg-white/90 transition-all duration-300"
          >
            Register
          </Button>
        </form>
        
        <div className="mt-6 text-center text-white/80">
          <p>Already have an account? 
            <button 
              onClick={() => navigate('/login')} 
              className="text-white font-medium ml-1 underline underline-offset-2"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
