import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#090D1A] text-slate-800 dark:text-slate-200">

      <div className="flex flex-1 relative">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto pb-20 md:pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
