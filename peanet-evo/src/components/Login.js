import { useState } from "react";
import './Login.css';

function Login({ setCurrentUser, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    { username: "user1", password: "1234" },
    { username: "user2", password: "1234" },
    { username: "user3", password: "1234" },
    { username: "user4", password: "1234" },
    { username: "user5", password: "123"},
    { username: "fikri", password: "1234"}
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setCurrentUser(username);
      setPage("user");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
