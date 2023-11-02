import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DataCard from "./components/data-card";
import { Chart } from "./components/chart";


export default async function TeacherAnalytics() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Sales"
          value={totalSales}
        />
        <DataCard
          label="Total Revenue"
          shouldFormat
          value={totalRevenue}
        />
      </div>
      <Chart data={data} />
    </div>
  );
}
