
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import TaskList from '../tasks/TaskList';
import ProgressBar from '../gamification/ProgressBar';
import Rewards from '../gamification/Rewards';
import { Task } from '@/types';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedToday, setCompletedToday] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  
  // Load initial demo tasks
  useEffect(() => {
    const demoTasks: Task[] = [
      { 
        id: '1', 
        title: 'Morning workout routine', 
        completed: false, 
        priority: 'high', 
        dueDate: new Date(new Date().setHours(10, 0, 0)),
        points: 20
      },
      { 
        id: '2', 
        title: 'Team meeting', 
        completed: false, 
        priority: 'medium', 
        dueDate: new Date(new Date().setHours(14, 30, 0)),
        points: 10
      },
      { 
        id: '3', 
        title: 'Submit project report', 
        completed: false, 
        priority: 'high', 
        dueDate: new Date(new Date().setHours(17, 0, 0)),
        points: 30
      },
      { 
        id: '4', 
        title: 'Grocery shopping', 
        completed: false, 
        priority: 'low', 
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        points: 15
      }
    ];
    
    setTasks(demoTasks);
    setStreak(3); // Demo streak
    setExperience(70); // Demo XP
  }, []);
  
  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
    
    // Find the task
    const task = tasks.find(t => t.id === taskId);
    
    if (task && !task.completed) {
      // Task was just completed
      setCompletedToday(prev => prev + 1);
      setExperience(prev => {
        const newExp = prev + task.points;
        // Level up if experience reaches 100
        if (newExp >= 100) {
          setLevel(prevLevel => prevLevel + 1);
          return newExp - 100;
        }
        return newExp;
      });
    } else if (task && task.completed) {
      // Task was un-completed
      setCompletedToday(prev => Math.max(0, prev - 1));
      setExperience(prev => {
        const newExp = prev - task.points;
        return newExp < 0 ? 0 : newExp;
      });
    }
  };

  return (
    <div className="pt-16 pb-24 px-4 space-y-6 animate-fade-in">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-4 animate-fade-in animate-delay-100">
          <h3 className="text-white text-sm font-medium">Completed Today</h3>
          <p className="text-white text-2xl font-bold">{completedToday}</p>
        </div>
        <div className="glass-card p-4 animate-fade-in animate-delay-200">
          <h3 className="text-white text-sm font-medium">Current Streak</h3>
          <p className="text-white text-2xl font-bold">{streak} days 🔥</p>
        </div>
      </div>
      
      {/* Level & Progress */}
      <Card className="p-4 glass-card animate-fade-in animate-delay-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Level {level}</h3>
            <p className="text-white/80 text-sm">Productivity Master</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold">{level}</span>
          </div>
        </div>
        <ProgressBar progress={experience} />
        <p className="text-white/80 text-xs mt-1 text-right">{experience}/100 XP</p>
      </Card>
      
      {/* Today's Tasks */}
      <div className="animate-fade-in animate-delay-400">
        <h2 className="text-white text-lg font-semibold mb-3">Today's Tasks</h2>
        <TaskList 
          tasks={tasks.filter(task => 
            task.dueDate.toDateString() === new Date().toDateString()
          )}
          onTaskComplete={handleTaskComplete}
        />
      </div>
      
      {/* Upcoming Tasks */}
      <div className="animate-fade-in animate-delay-500">
        <h2 className="text-white text-lg font-semibold mb-3">Upcoming</h2>
        <TaskList 
          tasks={tasks.filter(task => 
            task.dueDate.toDateString() !== new Date().toDateString()
          )}
          onTaskComplete={handleTaskComplete}
        />
      </div>
      
      {/* Rewards Section */}
      <Rewards level={level} streak={streak} />
    </div>
  );
};

export default Dashboard;
