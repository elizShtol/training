import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../hooks/auth.hook";
import { NavLink } from "react-router-dom";

export const NavBarC = () => {
  const [name, setName] = useState(null);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { token, userName } = useAuth();
  const isAuthenticated = !!token;

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  useEffect(() => {
    setName(userName);
  }, [userName, isAuthenticated]);

  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Brand>
          <h3>Ваша тренировка</h3>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavLink
            className="grey-text"
            style={{ marginTop: 6, marginLeft: 8 }}
            to="create"
          >
            Создать тренировку
          </NavLink>
          <NavLink
            className="grey-text"
            style={{ marginTop: 6, marginLeft: 8 }}
            to="training"
          >
            Тренировки
          </NavLink>
        </Nav>
        <div size="3" style={{ marginRight: 30 }} className="mr-sm-2">
          <NavDropdown
          style={{ marginRight: 40 }}
            title={" " + name}
            className="btn-sm"
            id="collasible-nav-dropdown"
          >
            <div>
              <NavLink className="black-text" to="training">
                Настройки
              </NavLink>
            </div>
            <NavDropdown.Item>
              <div className="black-text" href="/" onClick={logoutHandler}>
                Выход
              </div>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>
    </div>
  );
};

