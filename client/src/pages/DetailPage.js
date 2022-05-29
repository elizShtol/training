import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { Training } from "../components/Training.js";


// import { useHistory } from "react-router-dom";
// import {Button, Card, Accordion, InputGroup, Row, Col} from "react-bootstrap";
// import { ListExercise } from "../components/ListExercise";
// import { useMessage } from "../hooks/message.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
// import {SlideNav} from "../components/SlideNav";
// import {Content} from "../components/Content";

export const DetailPage = () => {

    
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  const [training, setTraining] = useState(null)
  const trainingId = useParams().id

  const getTraining = useCallback(async () => {
    try {
      const fetched = await request(`/api/trainings/${trainingId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      console.log(fetched)
      setTraining(fetched)
    } catch (e) {}
  }, [token, trainingId, request])

  useEffect(() => {
    getTraining()
  }, [getTraining])


  return (
      <div>
            <Training training={training}/>
      </div>
  );


};
