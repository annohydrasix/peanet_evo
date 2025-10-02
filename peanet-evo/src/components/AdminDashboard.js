import React, { useState, useEffect } from "react";
import "./AdminDashboard.css"; // ✅ import CSS

function AdminDashboard() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const registeredUsers = ["user1", "user2", "user3", "user4", "user5", "fikri"];
    const savedTimers = JSON.parse(localStorage.getItem("userTimers")) || {};
    const lastClaimData = JSON.parse(localStorage.getItem("lastClaimData")) || {};
    const today = new Date().toLocaleDateString();

    const data = registeredUsers.map(user => ({
      username: user,
      timeLeft: savedTimers[user] || 0,
      claimedToday: lastClaimData[user] === today
    }));

    setUsersData(data);
  }, []);

  const formatTime = seconds => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  const handleLogout = () => {
    window.location.href = "/";
  };
  
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Last Saved Time</th>
            <th>Claimed Today</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{formatTime(user.timeLeft)}</td>
              <td>{user.claimedToday ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="admin-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
