import React from "react";
import "./NavigationItem.css";
import { NavLink } from "react-router-dom";
const navigationItems = (props) => (
  <ul className="NavigationItems">
    <li className="NavigationItem">
      <NavLink to="/" exact>
        BurgerBuilder
      </NavLink>
      {props.isAuth ? <NavLink to="/orders">Orders</NavLink> : null}
      {props.isAuth ? (
        <NavLink to="/logout">Logout</NavLink>
      ) : (
        <NavLink to="/auth">SignUp</NavLink>
      )}
    </li>
  </ul>
);

export default navigationItems;
