import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import { useHistory } from "react-router-dom";
import { Button, Card, Accordion, InputGroup } from "react-bootstrap";
import { ListExercise } from "../components/ListExercise";
import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const DetailPage = () => {

    
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  const [trainig, setTraining] = useState(null)
  const trainingId = useParams().id

  const getTraining = useCallback(async () => {
    try {
      const fetched = await request(`/api/trainings/${trainingId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setTraining(fetched)
    } catch (e) {}
  }, [token, trainingId, request])

  useEffect(() => {
    getTraining()
  }, [getTraining])

  return (


    <div className="content container ">
      <Card className="bg-dark text-white">
        <Card.Header as="h3">Тренировка: бег на стадионе</Card.Header>
        <Card.Body style={{ marginLeft: "5rem" }}>
          

          <h5 style={{ marginTop: 10 }}>Типа тренировки: Беговая </h5>

          <h5 style={{ marginTop: 10 }}>Тренер: Иванов А.А.</h5>

          <h5 style={{ marginTop: 10 }}>Описание тренировки: Чередовать с силовой тренировкой</h5>
          <h5 style={{ marginTop: 10 }}>Упражнения</h5>
          <Card>
      <Card.Header>
        <h5 className="black-text">Разминка</h5>
        <Accordion.Toggle className="btn btn-dark" variant="link" eventKey="0">
          Показать описание
        </Accordion.Toggle>
        
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="black-text">Разминка всех мышцы с растяжкой</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Card.Header>
        <h5 className="black-text">Бег трусцой</h5>
        <Accordion.Toggle className="btn btn-dark" variant="link" eventKey="0">
          Показать описание
        </Accordion.Toggle>
        
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="black-text">Разминка всех мышцы с растяжкой</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Card.Header>
        <h5 className="black-text">Бег с ускорением</h5>
        <Accordion.Toggle className="btn btn-dark" variant="link" eventKey="0">
          Показать описание
        </Accordion.Toggle>
        
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="black-text">Разминка всех мышцы с растяжкой</Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Card.Header>
        <h5 className="black-text">Бег в умеренном темпе</h5>
        <Accordion.Toggle className="btn btn-dark" variant="link" eventKey="0">
          Показать описание
        </Accordion.Toggle>
        
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="black-text">Разминка всех мышцы с растяжкой</Card.Body>
      </Accordion.Collapse>
    </Card>

    <Card>
      <Card.Header>
        <h5 className="black-text">Заминка</h5>
        <Accordion.Toggle className="btn btn-dark" variant="link" eventKey="0">
          Показать описание
        </Accordion.Toggle>
        
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body className="black-text">Разминка всех мышцы с растяжкой</Card.Body>
      </Accordion.Collapse>
    </Card>

          

          <Button variant="primary" href="/training">
            К тренировкам
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
