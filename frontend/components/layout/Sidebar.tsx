<Logo />
import Link from "next/link";
import { navigation } from "@/constants/navigation";
import Logo from "./Logo";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  CalendarCheck,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white h-screen sidebar-container">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          LeadFlow CRM
        </h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100 transition"
                >
                  <Icon size={18} />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}