
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
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="animate-fade-in mb-8 flex flex-col items-center">
        <img 
          src="/lovable-uploads/ec6bb95d-0100-4968-9de5-c6a0bd9d84f7.png" 
          alt="Task Eaze Logo" 
          className="h-24 w-24"
=======
    <div className="login-background min-h-screen flex flex-col justify-center items-center px-4 relative">
      <div className="animate-fade-in mb-8 flex flex-col items-center relative z-10">
        <img 
          src="/lovable-uploads/d5795639-4a84-4926-b6b3-f4422e179fb8.png" 
          alt="Task Eaze Logo" 
          className="h-24 w-24 animate-pulse-soft"
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
        />
        <h1 className="text-2xl font-bold mt-3 text-white">Join Task Eaze</h1>
      </div>
      
<<<<<<< HEAD
      <div className="glass-card w-full max-w-md p-6 animate-fade-in animate-delay-100">
=======
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-lg w-full max-w-md p-6 animate-fade-in animate-delay-100 relative z-10">
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
        <h2 className="text-xl font-semibold text-white mb-6 text-center">Create Your Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
<<<<<<< HEAD
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
=======
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
              placeholder="Your Name"
            />
          </div>
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
=======
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
=======
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="text-white/90 text-sm font-medium mb-1 block">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
<<<<<<< HEAD
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
=======
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
              placeholder="••••••••"
            />
          </div>
          
          <Button 
            type="submit" 
<<<<<<< HEAD
            className="w-full bg-white text-taskEaze-violet hover:bg-white/90 transition-all duration-300"
=======
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
          >
            Register
          </Button>
        </form>
        
        <div className="mt-6 text-center text-white/80">
          <p>Already have an account? 
            <button 
              onClick={() => navigate('/login')} 
<<<<<<< HEAD
              className="text-white font-medium ml-1 underline underline-offset-2"
=======
              className="text-pink-400 font-medium ml-1 underline underline-offset-2"
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
            >
              Login
            </button>
          </p>
        </div>
      </div>
<<<<<<< HEAD
=======
      
      <button 
        onClick={() => navigate('/dashboard')} 
        className="mt-6 text-white/70 text-sm underline underline-offset-2 animate-fade-in animate-delay-300 relative z-10"
      >
        Continue as guest
      </button>
>>>>>>> 514e835fc4e7c4fc017eee953f00156516f805a7
    </div>
  );
};

export default RegisterPage;
