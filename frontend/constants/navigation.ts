import {
  CalendarCheck,
  LayoutDashboard,
  Settings,
  UserCircle,
  Users,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    href: "/leads",
    icon: Users,
  },
  {
    title: "Users",
    href: "/users",
    icon: UserCircle,
  },
  {
    title: "Follow-ups",
    href: "/followups",
    icon: CalendarCheck,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];