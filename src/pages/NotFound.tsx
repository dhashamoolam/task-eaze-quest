
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-taskEaze-pink to-taskEaze-violet px-4">
      <img 
        src="/lovable-uploads/ec6bb95d-0100-4968-9de5-c6a0bd9d84f7.png" 
        alt="Task Eaze Logo" 
        className="h-20 w-20 mb-6" 
      />
      <h1 className="text-4xl font-bold text-white mb-2">404</h1>
      <p className="text-xl text-white/90 mb-6">Oops! Page not found</p>
      <Button 
        onClick={() => navigate('/dashboard')} 
        className="bg-white text-taskEaze-violet hover:bg-white/90"
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
