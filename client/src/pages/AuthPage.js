import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { Card,Form,Navbar} from "react-bootstrap";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, error, clearError, request } = useHttp();
  const message = useMessage();
  const [form, setForm] = useState({
    email: "",
    password: "",
    
  });

  useEffect(() => {
    // console.log(error)
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  const registerHandler = async () => {
    try {
      // console.log({ ...form })
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };
  const loginHandler = async () => {
    // console.log("CHE")
    try {
      
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId,form.email);
    } catch (error) {}
  };
  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Brand>
          <h3>Ваша тренировка</h3>
        </Navbar.Brand>
      </Navbar>
      <Card
        className="container card grey darken-2 "
        style={{ marginTop: 70, width: "40rem" }}
      >
        <Card.Body>
          <Card.Title style={{ marginBottom: "3rem" }} className="white-text">
            Авторизация
          </Card.Title>

          
            <div className="input-field">
              <input
                className="yellow-input white-text"
                placeholder="Введите Логин"
                name="email"
                type="email"
                autoComplete="off"
                onChange={changeHandler}
              />

              <label htmlFor="email">Логин</label>
            </div>

            <div className="input-field">
              <input
                className="yellow-input white-text"
                placeholder="Введите пароль"
                name="password"
                type="password"
                onChange={changeHandler}
              />
              <label htmlFor="password">Пароль</label>
            </div>
          
          <button
            className="btn grey enter white-text"
            disabled={loading}
            onClick={loginHandler}
          >
            Войти
          </button>
          <button
            className="btn grey white-text"
            onClick={registerHandler}
            disabled={loading}
          >
            Зарегистрироваться
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};
