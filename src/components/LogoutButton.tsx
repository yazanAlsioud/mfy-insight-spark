import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useSidebar } from "@/components/ui/sidebar";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/auth");
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout} 
      className={`w-full h-11 text-foreground hover:bg-accent hover:text-foreground ${collapsed ? "justify-center px-2" : "justify-start px-3"}`}
    >
      <LogOut className={`w-5 h-5 flex-shrink-0 ${collapsed ? "" : "mr-3"}`} />
      {!collapsed && <span className="font-medium">Logout</span>}
    </Button>
  );
};

export default LogoutButton;