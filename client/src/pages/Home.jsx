import { useState,useEffect } from "react";
import axios from "axios";
import Playpage from "../pages/Playpage";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch data from backend (if needed)
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err.response?.data));
  }, []);

  // Form submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    // Send data to backend
    const res = await axios.post("http://localhost:3000/expenses",{
      name,
      amount: parseFloat(amount),
      category,
      date,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Update state with response from backend
    setExpenses([...expenses, res.data]);

    // Clear form
    setName("");
    setAmount("");
    setCategory("");
    setDate("");
  } catch (err) {
    console.error("Failed to add expense:", err.response?.data || err);
  }
};


  // Delete & Edit
  const handleDelete = (id) => setExpenses(expenses.filter((e) => e.id !== id));
  const handleEdit = (id) => {
    const exp = expenses.find((e) => e.id === id);
    setName(exp.name);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDate(exp.date);
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Filtered expenses
  const displayedExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {/* Expense Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* Filter */}
      <div className="filter">
        <label htmlFor="filter-category">Filter by Category:</label>
        <select
          id="filter-category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Expense Table */}
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => handleEdit(expense.id)}>Edit</button>
                  <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-amount">
          <strong>Total:</strong> $
          {expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
        </div>
      </div>

      {/* Dashboard / Logout */}
      <a href="http://localhost:5173/dashboard">
        <button>Dashboard</button>
      </a>
      <a href="http://localhost:5173/login">
        <button>Log Out</button>
      </a>

     
    </div>
  );
};

export default Home;


// const Home = () => {
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios
//       .get("http://localhost:3000/auth/home", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => console.log(res.data))
//       .catch((err) => console.error(err.response?.data));
//   }, []);

//   return (
//     <div>
     
//       <div className="container">
//         <h1>Expense Tracker</h1>
//         <form id="expense-form">
//             <input type="text" id="expense-name" placeholder="Expense Name" required />
//             <input type="number" id="expense-amount" placeholder="Amount" required />
//             <select id="expense-category" required>
//                 <option value="" disabled selected>Select Category</option>
//                 <option value="Food">Food</option>
//                 <option value="Transport">Transport</option>
//                 <option value="Entertainment">Entertainment</option>
//                 <option value="Other">Other</option>
//             </select>
//             <input type="date" id="expense-date" required />
//             <button type="submit">Add Expense</button>
//         </form>
//         <div className="expense-table">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Expense Name</th>
//                         <th>Amount</th>
//                         <th>Category</th>
//                         <th>Date</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody id="expense-list"></tbody>
//             </table>
//             <div className="total-amount">
//                 <strong>Total:</strong> $<span id="total-amount">0</span>
//             </div>
//         </div>
//         <div className="filter">
//             <label for="filter-category">Filter by Category:</label>
//             <select id="filter-category">
//                 <option value="All">All</option>
//                 <option value="Food">Food</option>
//                 <option value="Transport">Transport</option>
//                 <option value="Entertainment">Entertainment</option>
//                 <option value="Other">Other</option>
//             </select>
//         </div>
//     </div>

//       <a href="http://localhost:5173/dashboard">
//         <button onClick={() => console.log("Button clicked")}>Dashboard</button>
//       </a>
//       <a href="http://localhost:5173/login">
//         <button onClick={() => console.log("Button clicked")}>Log Out</button>
//       </a>

//             <Playpage/>
//     </div>
//   );
// };

// export default Home;

