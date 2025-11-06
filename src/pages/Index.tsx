import { useState } from "react";
import { Task } from "@/types/task";
import { TaskCard } from "@/components/TaskCard";
import { TaskDialog } from "@/components/TaskDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new landing page",
      description: "Create a modern, responsive landing page with hero section and features",
      status: "in-progress",
      priority: "high",
      assignee: "Sarah Johnson",
      createdAt: new Date("2025-01-15"),
      updatedAt: new Date("2025-01-15"),
    },
    {
      id: "2",
      title: "Fix authentication bug",
      description: "Users are experiencing issues with password reset functionality",
      status: "todo",
      priority: "high",
      assignee: "Mike Chen",
      createdAt: new Date("2025-01-16"),
      updatedAt: new Date("2025-01-16"),
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Add new API endpoints to the developer documentation",
      status: "done",
      priority: "low",
      assignee: "Alex Rivera",
      createdAt: new Date("2025-01-14"),
      updatedAt: new Date("2025-01-17"),
    },
    {
      id: "4",
      title: "Implement dark mode",
      description: "Add theme switching functionality across all pages",
      status: "in-progress",
      priority: "medium",
      assignee: "Sarah Johnson",
      createdAt: new Date("2025-01-16"),
      updatedAt: new Date("2025-01-16"),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    toast.success("Task created successfully!");
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    setTasks(tasks.map(t => 
      t.id === editingTask.id 
        ? { ...t, ...taskData, updatedAt: new Date() }
        : t
    ));
    setEditingTask(null);
    toast.success("Task updated successfully!");
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status, updatedAt: new Date() }
        : t
    ));
    toast.success("Task status updated!");
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success("Task deleted successfully!");
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-muted-foreground mt-1">Manage your team's tasks efficiently</p>
            </div>
            <Button 
              onClick={() => {
                setEditingTask(null);
                setDialogOpen(true);
              }}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground">
              {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                ? "Try adjusting your filters"
                : "Create your first task to get started"}
            </p>
          </div>
        ) : (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4 max-w-4xl mx-auto"
          }>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </main>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingTask(null);
        }}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
    </div>
  );
};

export default Index;
