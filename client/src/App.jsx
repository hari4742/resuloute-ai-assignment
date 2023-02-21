import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header>Face Recognition Based Attendence System</header>
      <nav>
        <NavLink to="recognise">Recognise</NavLink>
        <NavLink to="register">Register</NavLink>
        <NavLink to="users">Users</NavLink>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
