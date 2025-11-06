import { Task } from "@/types/task";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusColors = {
  'todo': 'bg-secondary text-secondary-foreground',
  'in-progress': 'bg-primary/10 text-primary border-primary/20',
  'done': 'bg-success/10 text-success border-success/20',
};

export const TaskCard = ({ task, onStatusChange, onDelete, onEdit }: TaskCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-2 truncate">{task.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              <Badge variant="outline" className={statusColors[task.status]}>
                {task.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, 'todo')}>
                Mark as To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, 'in-progress')}>
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, 'done')}>
                Mark as Done
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 mb-4">{task.description}</CardDescription>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
