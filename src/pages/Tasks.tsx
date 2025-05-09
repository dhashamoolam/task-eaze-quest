
import { useState, useEffect } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import TaskList from '@/components/tasks/TaskList';
import { Task } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
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
        completed: true, 
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
      },
      { 
        id: '5', 
        title: 'Call mom', 
        completed: false, 
        priority: 'medium', 
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        points: 10
      },
      { 
        id: '6', 
        title: 'Book dentist appointment', 
        completed: false, 
        priority: 'medium', 
        dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        points: 15
      },
    ];
    
    setTasks(demoTasks);
  }, []);
  
  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };
  
  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  
  // Filter tasks by status
  const todayTasks = tasks.filter(task => 
    task.dueDate.toDateString() === new Date().toDateString()
  );
  
  const upcomingTasks = tasks.filter(task => 
    task.dueDate.toDateString() !== new Date().toDateString() && 
    task.dueDate > new Date() &&
    !task.completed
  );
  
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <>
      <AppHeader />
      
      <div className="pt-16 pb-24 px-4 animate-fade-in">
        <Tabs defaultValue="today" className="mt-2">
          <TabsList className="w-full bg-white/20 p-1">
            <TabsTrigger 
              value="today" 
              className="flex-1 text-sm font-medium text-white data-[state=active]:bg-white/20"
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className="flex-1 text-sm font-medium text-white data-[state=active]:bg-white/20"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="flex-1 text-sm font-medium text-white data-[state=active]:bg-white/20"
            >
              Completed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-4">
            <TaskList 
              tasks={todayTasks}
              onTaskComplete={handleTaskComplete}
            />
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            <TaskList 
              tasks={upcomingTasks}
              onTaskComplete={handleTaskComplete}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <TaskList 
              tasks={completedTasks}
              onTaskComplete={handleTaskComplete}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav onAddTask={handleAddTask} />
    </>
  );
};

export default Tasks;
