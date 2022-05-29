import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { TrainingsTable } from "./TrainingsTable";

export const Content = (props) => {
  const [trainings, setTrainings] = useState([]);
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [category, setCategory] = useState(1);

  useEffect(()=>{
    let trainingC
    switch (props.training) {
      case "Общие": trainingC = 1; break
      case "Беговые": trainingC = 2;break
      case "Силовые": trainingC = 3;break
      case "Особые": trainingC = 4;break
      default: trainingC = 1;
    }
    setCategory(trainingC)
  },[props.training])
  useEffect(()=>{
    fetchTrainings()

  },[category])



  const fetchTrainings = async () => {

    try {
      const fetched = await request("/api/trainings?category=" + category, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setTrainings(fetched);
    } catch (e) {}
  };

  return (
    <div className="content">
      <h2>{category} </h2>
      <TrainingsTable trainings={trainings} />
    </div>
  );
};
