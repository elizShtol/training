import React, { useRef } from "react";
import { Card, Accordion, Button } from "react-bootstrap";

export const Exercise = (props) => {
  // const ref = useRef(initialValue)
  const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">{props.exercise.name}</Popover.Title>
    <Popover.Content>{
        
      props.exercise.descName    
    }</Popover.Content>
  </Popover>
);

const Example = () => (
  <div>
    <div>
      <label>
        <h3>{props.index + 1}</h3>
      </label>
      <label style={{width:"15rem", marginLeft: "1rem" }}>
        <h5 className="white-text">{props.exercise.name}</h5>
      </label>
      <div style={{justifyContent: "flex-end"}}>
      <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Button style={{ marginLeft: "1rem" }} variant="outline-primary">
          Показать описание
        </Button>
      </OverlayTrigger>
      <Button
        style={{ marginLeft: "1rem" }}
        onClick={() => props.onDelete(props.exercise.id)}
        variant="danger"
      >
        Удалить
      </Button>
      </div>
    </div>
  </div>
);
};




return <Example />;


