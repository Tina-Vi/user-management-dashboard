import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/">Main page</NavLink>
      <NavLink to="/users">List of users</NavLink>
      <NavLink to="/users/new">Add new user</NavLink>
    </div>
  );
}

export default Sidebar;
