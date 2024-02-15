import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/log-context";
function NavLinks() {
  const auth = useContext(AuthContext);
  return (
    <ul className="navbar nav-links">
      <li>
        <NavLink to="/users">All Users</NavLink>
      </li>
      <li>
        <NavLink to="/places">Places</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="places/add-place">Add Place</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
