import './Header.css';

function Header({ setPage }) {
  return (
    <div className="navbar">
      <a href="#home" onClick={() => setPage("home")}>Home</a>
      <a href="#login" onClick={() => setPage("login")}>User Login</a>
      <a href="#adminLogin" onClick={() => setPage("adminLogin")}>Admin Login</a>
      <a href="#user"onClick={() => setPage("user")}>User Dashboard</a>
    </div>
  );
}

export default Header;
