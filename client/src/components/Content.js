import React, { useCallback, useContext, useEffect, useState } from "react";
import "./style.css";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { TrainingsTable } from "./TrainingsTable";

export const Content = (props) => {
  const [trainings, setTrainings] = useState([]);
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchTrainings = useCallback(async () => {
    try {
      const fetched = await request("/api/trainings", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setTrainings(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  let trainingC = props.training;
  if (trainingC == null) {
    trainingC = "Общие";
  }

  return (
    <div className="content">
      <h2>{trainingC} </h2>
      <TrainingsTable trainings={trainings} />
    </div>
  );
};
