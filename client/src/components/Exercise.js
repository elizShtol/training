import React from "react";
import { Button, Card, Accordion } from "react-bootstrap";

export const Exercise = (props) => {
  // const ref = useRef(initialValue)

  return (
    <Card>
      <Card.Header>
        <h5 className="black-text">{props.exercise.name}</h5>
        {/*<Accordion.Toggle className="btn btn-dark" variant="link" eventKey={props.index}>*/}
        {/*  Показать описание*/}
        {/*</Accordion.Toggle>*/}
        <Accordion.Toggle
          style={{ marginLeft: 5 }}
          as={Button}
          onClick={() => props.onDelete(props.exercise.id)}
          className="btn btn-danger"
        >
          Удалить
        </Accordion.Toggle>
      </Card.Header>
      <div >
        <Card.Body className="black-text">{props.exercise.descName}</Card.Body>
      </div>
    </Card>
  );
};
