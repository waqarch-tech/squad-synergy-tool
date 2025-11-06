import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Task Manager
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your team's tasks efficiently with role-based access control
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">For Admins</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create and assign tasks</li>
                <li>• View all team tasks</li>
                <li>• Manage task priorities</li>
              </ul>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">For Members</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• View assigned tasks</li>
                <li>• Update task status</li>
                <li>• Real-time updates</li>
              </ul>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/auth')}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
