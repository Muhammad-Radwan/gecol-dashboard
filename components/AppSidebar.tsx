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
import { FaUser, FaBuilding, FaLock, FaList, FaHome } from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  {
    title: "الرئيسية",
    url: "/dashboard",
    icon: FaHome
  },
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
    title: "قائمة التركيبات",
    url: "/meterslist/e8a7299e-80db-4f3a-b176-0af88762e79c",
    icon: FaList
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
