import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-3">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search..."
            className="w-72 pl-10"
          />
        </div>
        <Bell
          className="cursor-pointer"
          size={22}
        />
        <Avatar>
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}