import React,{useState} from "react";
import { SlideNav } from "../components/SlideNav.js";
import { Content } from "../components/Content.js";
import {Row,Col} from 'react-bootstrap'


export const TrainingPage = () => {
  const [training,setTraining]=useState(null)
  const setTrainingCategory=(name)=>{
    setTraining(name)
  }
  return (
    <div>
      <Row>
        <Col sm={3}>
          <SlideNav setT={setTrainingCategory}/>
        </Col>
        <Col sm={9}>
          <Content training={training}/>
        </Col>
      </Row>
    </div>
  );
};
