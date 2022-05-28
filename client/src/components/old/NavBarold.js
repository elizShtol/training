import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useHistory } from "react-router-dom";
import React from "react";
import "./style.css";

export const NavBarold = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper z-depth teal darken-3">
          <a href="#!" style={{ marginLeft: 10 }} className="brand-logo">
            Ваша тренировка
          </a>
          
          <ul  style={{marginRight:15}} className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create">Создать тренировку</NavLink>
            </li>
            <li>
              <NavLink to="/links">Вы тренируетесь</NavLink>
            </li>
            <li>
            
              <a href="/" onClick={logoutHandler}>
              <i className="large material-icons">account_box</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
