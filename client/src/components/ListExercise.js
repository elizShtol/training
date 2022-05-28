import React from "react";
import {Accordion } from "react-bootstrap";
import { Exercise } from "./Exercise";

export const ListExercise = (props) => {
  return (
    <Accordion  style={{ width: "45rem" }}>
      {props.exercise.map((name,index) => {
        return <Exercise exercise={name} onDelete={props.deleteEx} index={index} key={name.id} />;
      })}
    </Accordion >
  );
};
