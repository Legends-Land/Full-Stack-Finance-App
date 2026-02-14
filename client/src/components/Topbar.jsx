export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));
    const displayName = user?.name
  ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
  : "Guest";
  
  return (
    <header className="topbar">
    
      <h1>Welcome {displayName}</h1>
    </header>
  );
}
