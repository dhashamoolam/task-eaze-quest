
import { Badge } from "@/components/ui/badge";

interface RewardsProps {
  level: number;
  streak: number;
}

const Rewards = ({ level, streak }: RewardsProps) => {
  // Example badges based on achievements
  const badges = [
    { 
      name: "Early Bird", 
      achieved: true, 
      description: "Complete 3 tasks before 10 AM" 
    },
    { 
      name: "Streak Master", 
      achieved: streak >= 3, 
      description: "Maintain a 3-day streak" 
    },
    { 
      name: "Productivity Pro", 
      achieved: level >= 2, 
      description: "Reach level 2" 
    },
    { 
      name: "Task Champion", 
      achieved: false, 
      description: "Complete 50 tasks total" 
    }
  ];
  
  return (
    <div className="animate-fade-in animate-delay-600">
      <h2 className="text-white text-lg font-semibold mb-3">Your Achievements</h2>
      <div className="glass-card p-4">
        <div className="grid grid-cols-2 gap-2">
          {badges.map((badge, index) => (
            <div 
              key={badge.name}
              className={`p-3 rounded-lg flex flex-col items-center justify-center text-center ${
                badge.achieved 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-white/40'
              }`}
            >
              <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-1 ${
                badge.achieved 
                  ? 'bg-gradient-to-br from-taskEaze-pink to-taskEaze-violet' 
                  : 'bg-white/10'
              }`}>
                {badge.achieved ? '🏆' : '🔒'}
              </div>
              <span className="text-sm font-medium">{badge.name}</span>
              <span className="text-xs mt-1 opacity-80">{badge.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
