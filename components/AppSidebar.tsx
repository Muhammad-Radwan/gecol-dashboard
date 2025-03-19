import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FaUser, FaBuilding, FaLock } from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  {
    title: "إضافة مستخدم",
    url: "/signup",
    icon: FaUser
  },
  {
    title: "إضافة شركة",
    url: "/createcompany",
    icon: FaBuilding
  },
  {
    title: "تسجيل الخروج",
    url: "/login",
    icon: FaLock
  },
];

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">
            إدارة المستخدمين
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}> <item.icon /> {item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
