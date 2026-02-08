export default function Sidebar() {

    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <aside className="sidebar">
      <h2 className="logo">{user?.name || "Guest"} Dashboard</h2>

      <nav>
        <a href="http://localhost:5173/home">Expense Tracker</a>
        <a href="http://localhost:3000/legend">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </aside>
  );
}
