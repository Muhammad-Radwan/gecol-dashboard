"use client";

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
import { userType } from "@/lib/EmployeeType";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaAccusoft,
  FaBuilding,
  FaChartBar,
  FaFileExcel,
  FaHome,
  FaList,
  FaLock,
  FaUser,
} from "react-icons/fa";

export function AppSidebar() {
  const queryClient = useQueryClient();

  const [userData, setUserData] = useState<userType | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      queryClient.setQueryData(["UserData"], parsed);
      setUserData(parsed);
    }
  }, []);

  const router = useRouter();

  const menuItems = [
    {
      title: "الرئيسية",
      url: "/dashboard",
      icon: FaHome,
      visible: true,
    },
    {
      title: "إضافة مستخدم",
      url: "/signup",
      icon: FaUser,
      visible: userData?.isITUser,
    },
    {
      title: "إضافة شركة",
      url: "/createcompany",
      icon: FaBuilding,
      visible: userData?.isITUser,
    },
    {
      title: "قائمة التركيبات",
      url: `/meterslist/${userData?.companyGuid}`,
      icon: FaList,
      visible: true,
    },
    {
      title: "تصدير البيانات",
      url: `/excelexport/${userData?.companyGuid}`,
      icon: FaFileExcel,
      visible: true,
    },
    {
      title: "احصائيات",
      url: `/statistics/${userData?.companyGuid}`,
      icon: FaChartBar,
      visible: true,
    },
    {
      title: "البلاغات والتسويات",
      url: `/historieslist/${userData?.companyGuid}`,
      icon: FaAccusoft,
      visible: true,
    },
  ];

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
              <SidebarMenuItem hidden={!item.visible} key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    {" "}
                    <item.icon /> {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={async () => {
                  await axios.get("/api/logout");
                  router.push("/login");
                }}
              >
                <FaLock />
                تسجيل الخروج
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
