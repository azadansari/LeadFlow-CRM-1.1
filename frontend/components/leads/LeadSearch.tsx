import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LeadSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LeadSearch({
  value,
  onChange,
}: LeadSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      />

      <Input
        placeholder="Search leads..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}