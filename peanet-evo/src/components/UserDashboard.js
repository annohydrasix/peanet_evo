import { useState, useEffect, useRef } from "react";
import "./UserDashboard.css";

function UserDashboard({ currentUser, timeLeft, setTimeLeft, isRunning, setIsRunning, handleLogout }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [claimedToday, setClaimedToday] = useState(false);
  const audioRef = useRef(null);
  const prevTimeRef = useRef(timeLeft); // track previous timeLeft

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/audio/phonering.wav");
    audioRef.current.loop = true;
  }, []);

  // Play alarm ketika timer habis
  useEffect(() => {
    if (prevTimeRef.current > 0 && timeLeft === 0 && audioRef.current) {
      audioRef.current.play().catch(err => console.log(err));
    }
    prevTimeRef.current = timeLeft; // update previous
  }, [timeLeft]);

  // 🔹 Check claim status on load
  useEffect(() => {
    const lastClaimData = JSON.parse(localStorage.getItem("lastClaimData")) || {};
    const today = new Date().toLocaleDateString();

    if (lastClaimData[currentUser] === today) {
      setClaimedToday(true);
    } else {
      setClaimedToday(false);
    }
  }, [currentUser]);

  // 🔹 Reset claim automatically when day changes
  useEffect(() => {
    const checkReset = () => {
      const lastClaimData = JSON.parse(localStorage.getItem("lastClaimData")) || {};
      const today = new Date().toLocaleDateString();

      if (lastClaimData[currentUser] !== today) {
        // reset if saved date is old or missing
        setClaimedToday(false);
      }
    };

    const interval = setInterval(checkReset, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleStart = () => {
    const totalSeconds = hours * 3600 + minutes * 60;
    if (totalSeconds <= 0) return;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const claimFreeTime = () => {
    if (!claimedToday) {
      const extraSeconds = 20 * 60; 
      setTimeLeft(prev => prev + extraSeconds);
      setIsRunning(true);

      const today = new Date().toLocaleDateString();
      const lastClaimData = JSON.parse(localStorage.getItem("lastClaimData")) || {};
      lastClaimData[currentUser] = today;
      localStorage.setItem("lastClaimData", JSON.stringify(lastClaimData));

      setClaimedToday(true);
      alert("✅ You claimed 20 free minutes!");
    } else {
      alert("❌ You have already claimed today!");
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  return (
    <div className="user-dashboard">
      <h2>{currentUser} Dashboard</h2>

      <div className="timer-input">
        <input
          type="number"
          value={hours}
          onChange={e => setHours(Number(e.target.value))}
          placeholder="Hours"
          disabled={isRunning}
        />
        <input
          type="number"
          value={minutes}
          onChange={e => setMinutes(Number(e.target.value))}
          placeholder="Minutes"
          disabled={isRunning}
        />
        <button onClick={handleStart} disabled={isRunning}>Start</button>
      </div>

      <p>Main Timer: {formatTime(timeLeft)}</p>
      <button onClick={claimFreeTime} disabled={claimedToday}>
        {claimedToday ? "Already Claimed Today" : "Claim 20 Minutes Free"}
      </button>
      <br /><br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserDashboard;
