
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types';
import { format } from 'date-fns';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
}

const TaskItem = ({ task, onComplete }: TaskItemProps) => {
  const [isChecking, setIsChecking] = useState(false);
  
  const handleCheck = () => {
    setIsChecking(true);
    // Add slight delay to show animation
    setTimeout(() => {
      onComplete(task.id);
      setIsChecking(false);
    }, 300);
  };
  
  // Priority color mapping
  const priorityColor = {
    high: 'bg-red-400/20',
    medium: 'bg-yellow-400/20',
    low: 'bg-green-400/20'
  };
  
  // Priority label text
  const priorityLabel = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };
  
  // Format the time for display
  const formattedTime = format(task.dueDate, 'h:mm a');
  
  // Format the date (only if it's not today)
  const isToday = task.dueDate.toDateString() === new Date().toDateString();
  const formattedDate = isToday ? 'Today' : format(task.dueDate, 'MMM d');
  
  return (
    <Card 
      className={`task-card mb-3 ${task.completed ? 'opacity-70' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div 
          className={`transform transition-transform ${isChecking ? 'scale-110' : ''}`}
          onClick={handleCheck}
        >
          <Checkbox 
            checked={task.completed}
            className={`${task.completed ? 'bg-taskEaze-violet border-taskEaze-violet' : 'border-gray-300'}`}
          />
        </div>
        
        <div className="flex-1">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-xs text-gray-500 flex items-center">
              <span>
                {formattedDate}, {formattedTime}
              </span>
            </div>
            <div className={`ml-2 px-2 py-0.5 rounded-full text-xs ${priorityColor[task.priority]} text-gray-700`}>
              {priorityLabel[task.priority]}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-taskEaze-violet/10 text-xs text-taskEaze-violet font-medium">
          {task.points}
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
