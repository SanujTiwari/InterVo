import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
