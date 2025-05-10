
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Task } from '@/types';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface AddTaskFormProps {
  onAddTask: (task: Task) => void;
  onCancel: () => void;
}

const AddTaskForm = ({ onAddTask, onCancel }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dueTime, setDueTime] = useState(format(new Date(), "HH:mm"));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    
    // Parse date and time
    const [year, month, day] = dueDate.split('-').map(Number);
    const [hours, minutes] = dueTime.split(':').map(Number);
    
    // Create date object (months are 0-indexed in JS)
    const dueDateObj = new Date(year, month - 1, day, hours, minutes);
    
    // Calculate points based on priority
    const pointsMap = {
      low: 10,
      medium: 20,
      high: 30
    };
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      priority,
      dueDate: dueDateObj,
      points: pointsMap[priority]
    };
    
    onAddTask(newTask);
    toast.success("Task added successfully");
  };
  
  return (
    <div className="p-4 glass-card animate-fade-in">
      <h2 className="text-xl font-semibold text-white mb-4">New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-white">Task Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="date" className="text-white">Due Date</Label>
            <Input
              id="date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-white">Due Time</Label>
            <Input
              id="time"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="bg-white/20 border-white/30 text-white"
            />
          </div>
        </div>
        
        <div>
          <Label className="text-white block mb-2">Priority</Label>
          <RadioGroup 
            value={priority} 
            onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="low" id="low" className="text-green-500" />
              <Label htmlFor="low" className="text-white">Low</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="medium" id="medium" className="text-yellow-500" />
              <Label htmlFor="medium" className="text-white">Medium</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="high" id="high" className="text-red-500" />
              <Label htmlFor="high" className="text-white">High</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex space-x-3 pt-2">
          <Button 
            type="button" 
            onClick={onCancel}
            variant="outline" 
            className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-white text-taskEaze-violet hover:bg-white/90"
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
