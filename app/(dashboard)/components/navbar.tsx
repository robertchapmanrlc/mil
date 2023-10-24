import { UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";
import TeacherModeButton from "./teacher-mode-button";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <div className="h-full flex items-center bg-white border-b shadow-sm p-4">
        <MobileSidebar />
        <SearchInput />
      <div className="flex items-center gap-x-5 ml-auto">
        <TeacherModeButton />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
