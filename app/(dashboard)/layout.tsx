import Navbar from "@/components/navbar";
import SideBar from "./components/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="hidden md:flex w-80 h-full flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <main className="h-full md:pl-80 pt-20">{children}</main>
    </div>
  );
}
