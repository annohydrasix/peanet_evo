import { useState, useEffect } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import Timer from "./components/Timer"; // main timer component
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Load user timer on login
  useEffect(() => {
    if (currentUser) {
      const savedTimers = JSON.parse(localStorage.getItem("userTimers")) || {};
      if (savedTimers[currentUser] != null) {
        setTimeLeft(savedTimers[currentUser]);
        setIsRunning(savedTimers[currentUser] > 0);
      } else {
        setTimeLeft(0);
        setIsRunning(false);
      }
    }
  }, [currentUser]);

  // Logout user
  const handleLogout = () => {
    if (currentUser) {
      const savedTimers = JSON.parse(localStorage.getItem("userTimers")) || {};
      savedTimers[currentUser] = timeLeft;
      localStorage.setItem("userTimers", JSON.stringify(savedTimers));
    }
    setIsRunning(false);
    setTimeLeft(0);
    setCurrentUser("");
    setPage("home");
  };

  // Logout admin
  const handleAdminLogout = () => {
    console.log("Admin logout clicked");
    setPage("home");
  };

  // Routing pages
  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
        );
      case "login":
        return <Login setCurrentUser={setCurrentUser} setPage={setPage} />;
      case "user":
        return (
          <UserDashboard
            currentUser={currentUser}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            handleLogout={handleLogout}
          />
        );
      case "adminLogin":
        return <AdminLogin setPage={setPage} />;
      case "adminDashboard":
        return <AdminDashboard handleLogout={handleAdminLogout} />;

      default:
        return (
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
        );
    }
  };

  return (
    <div>
      <Header setPage={setPage} />
      {renderPage()}
    </div>
  );
}

export default App;
