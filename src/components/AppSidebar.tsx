
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { Calendar, FileText, Home, Settings, Bell } from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { title: 'Tableau de bord', path: '/', icon: Home },
    { title: 'Factures', path: '/invoices', icon: FileText },
    { title: 'Rapports', path: '/reports', icon: Calendar },
    { title: 'Paramètres', path: '/settings', icon: Settings }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="py-4 px-2">
          <h1 className="text-xl font-bold text-center">Alerte Facture</h1>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path} className="flex items-center">
                        <item.icon className="mr-2 h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-auto pb-4">
          <div className="px-4">
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3">
              <Bell className="h-5 w-5 text-red-500" />
              <div className="text-sm text-red-700">3 factures en retard</div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
