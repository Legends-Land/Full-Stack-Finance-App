// import Sidebar from "../components/Sidebar";
// import StatCard from "../components/Statcard";
// import Topbar from "../components/Topbar";
// import "../styles/dashboard.css";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [expenses, setExpenses] = useState([]); // ✅ state for expenses

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:3000/expenses", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setExpenses(res.data))
//       .catch((err) => console.error(err.response?.data));
//   }, []);

//   // Helper to get total by filter function
//   const getTotal = (filterFn) =>
//     expenses.filter(filterFn).reduce((sum, e) => sum + e.amount, 0);

//   // Daily total: same day as today
//   const today = new Date();
//   const dailyTotal = getTotal(
//     (e) => new Date(e.date).toDateString() === today.toDateString(),
//   );

//   // Weekly total: within last 7 days
//   const weeklyTotal = getTotal((e) => {
//     // const today = new Date();
//     const expenseDate = new Date(e.date);
//     const diffDays = (today - expenseDate) / (1000 * 60 * 60 * 24);
//     return diffDays <= 7;
//   });

//   // Monthly total: same month as today
//   const monthlyTotal = getTotal((e) => {
//     // const today = new Date();
//     const expenseDate = new Date(e.date);
//     return (
//       today.getMonth() === today.getMonth() &&
//       today.getFullYear() === today.getFullYear()
//     );
//   });


import Sidebar from "../components/Sidebar";
import StatCard from "../components/Statcard";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";


import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err.response?.data));
  }, []);

  // Normalize date to YYYY-MM-DD (prevents timezone issues)
  const normalizeDate = (date) =>
    new Date(date).toISOString().split("T")[0];

  const today = new Date();
  const todayNormalized = normalizeDate(today);

  // Helper function
  const getTotal = (filterFn) =>
    expenses
      .filter(filterFn)
      .reduce((sum, e) => sum + Number(e.amount), 0);

  // -------------------
  // DAILY TOTAL
  // -------------------
  const dailyTotal = getTotal(
    (e) => normalizeDate(e.date) === todayNormalized
  );

  // -------------------
  // WEEKLY TOTAL (Sunday → Saturday)
  // -------------------
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weeklyTotal = getTotal((e) => {
    const expenseDate = new Date(e.date);
    return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
  });

  // -------------------
  // MONTHLY TOTAL
  // -------------------
  const monthlyTotal = getTotal((e) => {
    const expenseDate = new Date(e.date);
    return (
      expenseDate.getMonth() === today.getMonth() &&
      expenseDate.getFullYear() === today.getFullYear()
    );
  });

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="stats-grid">
          <StatCard title="Daily Spend" value={`$${dailyTotal.toFixed(2)}`} />
          <StatCard title="Weekly Total" value={`$${weeklyTotal.toFixed(2)}`} />
          <StatCard
            title="Monthly Total"
            value={`$${monthlyTotal.toFixed(2)}`}
          />
        </div>
      </div>
    </div>
  );
}
