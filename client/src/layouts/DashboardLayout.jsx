import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e5e5e5]">
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-[68px] lg:pl-[240px] transition-all duration-200 min-h-screen flex flex-col">
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
