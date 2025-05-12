
import { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';

type TaskHistoryItem = {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  points: number;
};

const TaskHistory = () => {
  const { profile, loading } = useUser();
  const [taskHistory, setTaskHistory] = useState<TaskHistoryItem[]>([
    {
      id: '1',
      title: 'Morning workout routine',
      date: new Date(Date.now() - 86400000), // Yesterday
      completed: true,
      points: 20
    },
    {
      id: '2',
      title: 'Team meeting',
      date: new Date(Date.now() - 86400000), // Yesterday
      completed: true,
      points: 10
    },
    {
      id: '3',
      title: 'Submit project report',
      date: new Date(), // Today
      completed: false,
      points: 30
    },
    {
      id: '4',
      title: 'Grocery shopping',
      date: new Date(), // Today
      completed: true,
      points: 15
    },
    {
      id: '5',
      title: 'Weekly planning',
      date: new Date(Date.now() - 172800000), // 2 days ago
      completed: true,
      points: 25
    }
  ]);
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // Group tasks by date
  const groupedTasks = taskHistory.reduce((groups, task) => {
    const date = format(task.date, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {} as Record<string, TaskHistoryItem[]>);

  const sortedDates = Object.keys(groupedTasks).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Task History</h2>
      </div>
      
      <Card className="glass-card p-4">
        <Accordion type="single" collapsible className="w-full">
          {sortedDates.map((date) => (
            <AccordionItem 
              key={date} 
              value={date} 
              className="border-b border-white/10"
            >
              <AccordionTrigger className="text-white hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>{format(new Date(date), 'MMMM d, yyyy')}</span>
                  <span className="text-sm text-white/70">
                    {groupedTasks[date].filter(t => t.completed).length} / {groupedTasks[date].length} completed
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {groupedTasks[date].map((task) => (
                      <TableRow 
                        key={task.id} 
                        className="border-b border-white/10"
                      >
                        <TableCell className="py-2">
                          <div className="flex items-center">
                            {task.completed ? 
                              <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" /> :
                              <XCircle className="h-5 w-5 text-red-400 mr-2" />
                            }
                            <span className={`text-white ${task.completed ? '' : 'opacity-70'}`}>
                              {task.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-white/70">
                          {task.completed ? `+${task.points} XP` : '0 XP'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default TaskHistory;
