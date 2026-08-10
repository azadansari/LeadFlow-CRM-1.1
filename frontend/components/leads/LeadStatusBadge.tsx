import { Badge } from "@/components/ui/badge";

interface LeadStatusBadgeProps {
  status: string;
}

export default function LeadStatusBadge({
  status,
}: LeadStatusBadgeProps) {
  const styles: Record<string, string> = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Qualified: "bg-purple-100 text-purple-700",
    Converted: "bg-green-100 text-green-700",
    Lost: "bg-red-100 text-red-700",
  };

  return (
    <Badge
      variant="outline"
      className={styles[status] || ""}
    >
      {status}
    </Badge>
  );
}