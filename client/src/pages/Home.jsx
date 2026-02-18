import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { takeCoverage } from "v8";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch expenses
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err.response?.data));
  }, []);

  // Clear form
  const clearForm = () => {
    setName("");
    setAmount("");
    setCategory("");
    setDate("");
    setEditingId(null);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!name || !amount || !category || !date) return alert("Fill all fields");

    // 🔥 FIX: force local midnight
    const localDate = new Date(date + "T00:00:00");

    try {
      let res;
      if (editingId) {
        // Update existing expense
        res = await axios.put(
          `http://localhost:3000/expenses/${editingId}`,
          { name, amount: parseFloat(amount), category, date: localDate },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setExpenses((prev) =>
          prev.map((e) => (e.id === editingId ? res.data : e)),
        );
      } else {
        // Create new expense
        res = await axios.post(
          "http://localhost:3000/expenses",
          { name, amount: parseFloat(amount), category, date: localDate},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setExpenses((prev) => [...prev, res.data]);
      }
      clearForm();
    } catch (err) {
      console.error("Error saving expense:", err.response?.data || err);
    }
  };

  // Edit
  const handleEdit = (expense) => {
    setName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date.slice(0, 10)); // remove time
    setEditingId(expense.id);
  };

  // Delete
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Filtered expenses
  const user = JSON.parse(localStorage.getItem("user"));
  const displayedExpenses =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);
  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Guest";

  return (
    <div className="container">
      <h1> Welcome {displayName}</h1>
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
        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
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
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(expense)}>Edit</button>
                  <button onClick={() => deleteExpense(expense.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-amount">
          <strong>Total:</strong> $
          {displayedExpenses
            .reduce((sum, exp) => sum + exp.amount, 0)
            .toFixed(2)}
        </div>
      </div>

      {/* Dashboard / Logout */}
      <div className="navigation-buttons">
        <a href="/dashboard">
          <button>Dashboard</button>
        </a>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
