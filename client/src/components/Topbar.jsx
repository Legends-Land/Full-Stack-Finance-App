export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <header className="topbar">
      <h1>Welcome Back</h1>
      <div className="user">{user.name || 'Guest'}</div>
    </header>
  );
}
