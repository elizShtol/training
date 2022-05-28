import React, { useState,useContext } from "react";
import {useHistory } from 'react-router-dom'
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { ListExercise } from "./ListExercise";
import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CreateForm = () => {
  const history=useHistory()
  const [exercise, setExercise] = useState([]);
  const [form, setForm] = useState({
    nameEx: "",
    descEx: "Нет описания",
  });

  const [httpsend, sethttpsend] = useState({
    nametr: "",
    trainer: "",
    type: "Общая",
    description: "",
    exercise: exercise,
  });
  const { request } = useHttp();

  const auth = useContext(AuthContext);

  const changeHandlerHttp = (event) => {
    sethttpsend({ ...httpsend, [event.target.name]: event.target.value });
  };

  const message = useMessage();
  const addEx = () => {
    if (form.descEx === "") {
      setForm((form.descEx = "Нет описания"));
    }
    if (form.nameEx) {
      setExercise(
        exercise.concat({
          id: Date.now(),
          name: form.nameEx,
          descName: form.descEx,
        })
      );
      document.getElementById("nameEx").value = "";
      document.getElementById("descEx").value = "";
      setForm({
        nameEx: "",
        descEx: "Нет описания",
      });
    } else {
      message("Введите название упражнения");
    }
  };
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const removeExercise = (idx) => {
    setExercise(exercise.filter((ex) => ex.id !== idx));
  };

  const createTraining = async () => {
    
    if (exercise.length === 0 || httpsend.name === "") {
      message("Введите название тренировки и добавьте упражнения");
    } else {
      try {
        const data = await request(
          "/api/trainings/create",
          "POST",
          {

            name: httpsend.nametr,
            trainer: httpsend.trainer,
            description:httpsend.description,
            exercises: exercise,
            category: httpsend.type,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push('/training')
      } catch (error) {}
    }
  };

  return (
    <div className="content container ">
      <Card className="bg-dark text-white">
        <Card.Header as="h3">Создайте свою тренировку</Card.Header>
        <Card.Body style={{ marginLeft: "5rem" }}>
          <h5 style={{ marginTop: 10 }}>Название тренировки </h5>
          <div style={{ marginTop: "10", width: "30rem" }}>
            <InputGroup className="input-group-prepend">
              <FormControl
                style={{ height: 35 }}
                name="nametr"
                onChange={changeHandlerHttp}
                className="bg-white rounded"
                placeholder="Введите название тренировки"
                aria-label="Введите название тренировки"
                aria-describedby="basic-addon2"
                id="inputGroupSelect01"
              />
            </InputGroup>
          </div>

          <h5 style={{ marginTop: 10 }}>Выберите тип тренировки </h5>
          <div style={{ marginTop: 10, width: "30rem" }}>
            <div className="input-group">
              <div className="input-group-prepend">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Тип
                </label>
              </div>
              <select
              onChange={changeHandlerHttp}
                name="type"
                className="custom-select"
                id="inputGroupSelect01"
              >
                <option value="1">Общая</option>
                <option value="2">Беговая</option>
                <option value="3">Силовая</option>
                <option value="4">Особая</option>
              </select>
            </div>
          </div>

          <h5 style={{ marginTop: 10 }}>Тренер</h5>
          <div style={{ marginTop: "10", width: "30rem" }}>
            <InputGroup className="input-group-prepend">
              <FormControl
              onChange={changeHandlerHttp}
                name="trainer"
                style={{ height: 35 }}
                className="bg-white rounded"
                placeholder="Введите Имя тренера"
                aria-label="Введите Имя тренера"
                aria-describedby="basic-addon2"
                id="inputGroupSelect02"
              />
            </InputGroup>
          </div>

          <h5 style={{ marginTop: 10 }}>Описание тренировки</h5>
          <div style={{ width: "30rem" }} className="input-group">
            <div className="input-group-prepend">
              <span
                style={{
                  margin: 0,
                  padding: 0,
                  width: 92,
                  whiteSpace: "normal",
                }}
                className="input-group-text"
              >
                Описание тренировки
              </span>
            </div>
            <textarea
            onChange={changeHandlerHttp}
              name="description"
              className="form-control"
              aria-label="With textarea"
            ></textarea>
          </div>

          <h5 style={{ marginTop: 20 }}>Добавьте необходимые управжнения</h5>
          <div style={{ marginTop: "1rem", width: "38rem" }}>
            <InputGroup className="input-group-prepend">
              <FormControl
                name="nameEx"
                id="nameEx"
                onChange={changeHandler}
                style={{ height: 35 }}
                className="bg-white rounded"
                placeholder="Введите название упражнения"
                aria-label="Введите название упражнения"
                aria-describedby="basic-addon2"
              />

              <InputGroup.Append>
                <Button
                  onClick={addEx}
                  style={{ marginLeft: "1rem" }}
                  variant="outline-primary"
                >
                  Добавить
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <div
              style={{ marginTop: 5, width: "30rem" }}
              className="input-group"
            >
              <div className="input-group-prepend">
                <span
                  style={{
                    margin: 0,
                    padding: 0,
                    width: 92,
                    whiteSpace: "normal",
                  }}
                  className="input-group-text"
                >
                  Описание упражнения
                </span>
              </div>
              <textarea
                name="descEx"
                id="descEx"
                onChange={changeHandler}
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
          </div>

          <h4 style={{ marginTop: 15, marginBottom: 13 }}>Тренировка</h4>

          <ListExercise exercise={exercise} deleteEx={removeExercise} />

          <Button variant="primary" onClick={() => createTraining()}>
            Создать
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
