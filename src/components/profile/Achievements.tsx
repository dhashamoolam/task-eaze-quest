
import { Award, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Tooltip, 
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  achieved: boolean;
  progress: number;
  maxProgress: number;
  rewardXp: number;
}

const Achievements = () => {
  const { profile, loading } = useUser();
  
  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Early Bird',
      description: 'Complete 3 tasks before 10 AM',
      icon: '🌅',
      achieved: true,
      progress: 3,
      maxProgress: 3,
      rewardXp: 50
    },
    {
      id: '2',
      name: 'Streak Master',
      description: `Maintain a ${profile?.streak || 0}-day streak`,
      icon: '🔥',
      achieved: profile?.streak ? profile.streak >= 3 : false,
      progress: profile?.streak || 0,
      maxProgress: 3,
      rewardXp: 100
    },
    {
      id: '3',
      name: 'Productivity Pro',
      description: `Reach level ${profile?.level || 1}`,
      icon: '⭐',
      achieved: profile?.level ? profile.level >= 2 : false,
      progress: profile?.level || 1,
      maxProgress: 2,
      rewardXp: 75
    },
    {
      id: '4',
      name: 'Task Champion',
      description: 'Complete 50 tasks total',
      icon: '🏆',
      achieved: profile?.tasksCompleted ? profile.tasksCompleted >= 50 : false,
      progress: profile?.tasksCompleted || 0,
      maxProgress: 50,
      rewardXp: 150
    },
    {
      id: '5',
      name: 'Focus Time',
      description: 'Complete 5 high-priority tasks in a day',
      icon: '🎯',
      achieved: false,
      progress: 2,
      maxProgress: 5,
      rewardXp: 120
    },
    {
      id: '6',
      name: 'Balanced Life',
      description: 'Complete tasks across 4 different categories',
      icon: '⚖️',
      achieved: false,
      progress: 2,
      maxProgress: 4,
      rewardXp: 80
    }
  ];
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Award className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Achievements</h2>
      </div>
      
      <Card className="glass-card p-4">
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg flex flex-col items-center justify-center text-center ${
                achievement.achieved 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-white/60'
              }`}
            >
              <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 ${
                achievement.achieved 
                  ? 'bg-gradient-to-br from-taskEaze-pink to-taskEaze-violet' 
                  : 'bg-white/10'
              }`}>
                <span className="text-xl">{achievement.icon}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{achievement.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-white/70" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{achievement.description}</p>
                      <p className="text-xs mt-1">Reward: {achievement.rewardXp} XP</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="w-full mt-2">
                <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs">{achievement.progress}</span>
                  <span className="text-xs">{achievement.maxProgress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Achievements;
