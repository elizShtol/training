import React from "react";
import { ListGroup } from "react-bootstrap";
import "./style.css";

export const SlideNav = (props) => {
  const changeHandler = (event) => {
    props.setT(event.target.name);
  };

  return (
    <div className="slide">
      <ListGroup variant="flush" className="sidenav sidenav-fixed slide">
        <ListGroup.Item onClick={changeHandler} className="slideBut" disabled>
          <h3>Категории:</h3>
        </ListGroup.Item>
        <ListGroup.Item
          name="Общие"
          onClick={changeHandler}
          style={{ borderRadius: 0 }}
          className="slideBut"
          action
        >
          Общие
        </ListGroup.Item>
        <ListGroup.Item
          name="Беговые"
          onClick={changeHandler}
          style={{ borderRadius: 0 }}
          className="slideBut"
          action
        >
          Беговые
        </ListGroup.Item>
        <ListGroup.Item
          name="Силовые"
          onClick={changeHandler}
          style={{ borderRadius: 0 }}
          className="slideBut"
          action
        >
          Силовые
        </ListGroup.Item>
        <ListGroup.Item
          name="Особые"
          onClick={changeHandler}
          style={{ borderRadius: 0 }}
          className="slideBut"
          action
        >
          Особые
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};
