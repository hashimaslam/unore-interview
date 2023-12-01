import Table from "@/components/Table";
import TotalAmountContainer from "@/components/TotalAmountContainer";

export default function Home() {
  return (
    <div className="min-h-screen p-24 max-w-full">
      <div className="max-w-full">
        <TotalAmountContainer />
        <h4 className="text-lg font-semibold mb-2">Withdraws</h4>
        <Table />
      </div>
    </div>
  );
}
