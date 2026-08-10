import AddLeadDialog from "./AddLeadDialog";
export default function LeadHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-sm text-gray-500">
          Manage all your leads in one place.
        </p>
      </div>
      <AddLeadDialog />
    </div>
  );
}