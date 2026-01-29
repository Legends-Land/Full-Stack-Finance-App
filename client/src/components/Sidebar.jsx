export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Dashboard</h2>

      <nav>
        <a href="http://localhost:5173/home">Expense Tracker</a>
        <a href="http://localhost:3000/legend">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </aside>
  );
}
