import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Library, Compass, Star, TrendingUp, Download } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Browse",
    url: createPageUrl("Browse"),
    icon: Compass,
  },
  {
    title: "My List",
    url: createPageUrl("MyList"),
    icon: Library,
  },
  {
    title: "Import Comics",
    url: createPageUrl("Import"),
    icon: Download,
  },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <style>{`
          :root {
            --sidebar-background: rgba(15, 10, 25, 0.95);
            --sidebar-foreground: #e9d5ff;
            --sidebar-primary: #a855f7;
            --sidebar-primary-foreground: #faf5ff;
            --sidebar-accent: rgba(168, 85, 247, 0.1);
            --sidebar-accent-foreground: #c084fc;
            --sidebar-border: rgba(168, 85, 247, 0.2);
          }
        `}</style>
        <Sidebar className="border-r border-purple-900/30 bg-slate-950/95 backdrop-blur-xl">
          <SidebarHeader className="border-b border-purple-900/30 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  ComicVault
                </h2>
                <p className="text-xs text-purple-300/70">Track Your Reading</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-purple-400/70 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`group hover:bg-purple-900/30 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30' 
                            : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className={`w-5 h-5 ${
                            location.pathname === item.url ? 'text-white' : 'text-purple-300 group-hover:text-purple-200'
                          }`} />
                          <span className={`font-medium ${
                            location.pathname === item.url ? 'text-white' : 'text-purple-200'
                          }`}>
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-purple-400/70 uppercase tracking-wider px-3 py-2">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300">Reading</span>
                    </div>
                    <span className="font-bold text-purple-400">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-fuchsia-400" />
                      <span className="text-purple-300">Favorites</span>
                    </div>
                    <span className="font-bold text-fuchsia-400">0</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-slate-950/60 backdrop-blur-xl border-b border-purple-900/30 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-purple-900/30 p-2 rounded-lg transition-colors duration-200 text-purple-300" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                ComicVault
              </h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}