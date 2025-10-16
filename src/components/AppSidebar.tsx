import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  MessageSquare,
  TrendingUp,
  Upload,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoutButton from "./LogoutButton";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Chatbot", url: "/chatbot", icon: MessageSquare },
  { title: "Benchmark", url: "/benchmark", icon: TrendingUp },
  { title: "Data Entry", url: "/data-entry", icon: Upload },
];

const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r border-border">
        {/* Header */}
        <div className={`border-b border-border ${collapsed ? "p-3" : "p-6"}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-foreground">Intelligent FinAnalytics</h1>
                <p className="text-xs text-muted-foreground">Financial Intelligence Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className={`py-4 ${collapsed ? "px-2" : "px-4"}`}>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              Main
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={`h-11 ${collapsed ? "justify-center px-2" : "justify-start px-3"}`}>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={`flex items-center w-full h-full rounded-md transition-colors ${
                          active 
                            ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                            : "text-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        <item.icon className={`w-5 h-5 flex-shrink-0 ${collapsed ? "" : "mr-3"}`} />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className={`mt-auto border-t border-border ${collapsed ? "p-2" : "p-4"}`}>
          <SidebarMenu className="space-y-1">
            {bottomItems.map((item) => {
              const active = isActive(item.url);
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`h-11 ${collapsed ? "justify-center px-2" : "justify-start px-3"}`}>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center w-full h-full rounded-md transition-colors ${
                        active 
                          ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                          : "text-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${collapsed ? "" : "mr-3"}`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            
            <SidebarMenuItem>
              <LogoutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}