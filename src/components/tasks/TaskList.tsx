
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { Card } from '@/components/ui/card';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (id: string) => void;
}

const TaskList = ({ tasks, onTaskComplete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <Card className="p-4 text-center text-gray-500 bg-white/80 rounded-xl">
        No tasks for this timeframe
      </Card>
    );
  }
  
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onComplete={onTaskComplete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
