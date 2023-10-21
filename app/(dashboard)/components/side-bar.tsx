import Logo from "./logo";

export default function SideBar() {
  return <div className="h-full flex flex-col items-center bg-green-600 overflow-y-auto shadow-sm border-r">
    <div className="flex items-center pt-3">
      <Logo />
      <h1 className="text-lg text-white">Music Instrument Learning</h1>
    </div>
  </div>;
}
