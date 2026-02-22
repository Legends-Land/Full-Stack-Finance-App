import { Link, useNavigate } from "react-router-dom";


export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className="sidebar">
      <div className="logo-container"> 
        <div><h2 className="logo"> Coinage</h2></div>
      <div><img src='images/Coinage-logo.png' className='company-logo' alt = "Company-logo"/></div>
       </div>
     

      <nav>

         <Link to="/dashboard">Dashboard</Link>

        <Link to="/home">Expense Tracker</Link>

        <Link to="/login" onClick={() => localStorage.removeItem("token")}>
          Log Out
        </Link>
       
      </nav>
    </aside>
  );
}
