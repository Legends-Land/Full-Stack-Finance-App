import Sidebar from '../components/Sidebar';
import StatCard from '../components/Statcard';
import Topbar from '../components/Topbar';
import '../styles/dashboard.css';

export default function Dashboard() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="stats-grid">
          <StatCard title="Daily Spend" value="$1,024" />
          <StatCard title="Weekly Total" value="$12,345" />
          <StatCard title="Monthly Total" value="$45,678" />
          <StatCard title="Feedback" value="75" />
        </div>
      </div>
    </div>
  );
}