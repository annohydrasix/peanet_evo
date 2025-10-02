import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import "./AdminLogin.css"; // ⬅️ tambahkan import css

function AdminLogin() {
  const [page, setPage] = useState("login"); // login | dashboard
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usersData, setUsersData] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      // load users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const savedTimers = JSON.parse(localStorage.getItem("userTimers")) || {};
      const lastClaimData = JSON.parse(localStorage.getItem("lastClaimData")) || {};
      const today = new Date().toLocaleDateString();

      const data = registeredUsers.map((user) => ({
        username: user,
        timeLeft: savedTimers[user] || 0,
        claimedToday: lastClaimData[user] === today,
      }));

      setUsersData(data);
      setPage("dashboard");
    } else {
      alert("❌ Invalid admin credentials!");
    }
  };

  const handleLogout = () => {
    setPage("login");
    setUsername("");
    setPassword("");
  };

  if (page === "dashboard") {
    return <AdminDashboard usersData={usersData} onLogout={handleLogout} />;
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
