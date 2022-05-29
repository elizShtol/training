import {Button, Card} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
// import {Link} from "react-router-dom";

export const Training = ({training}) => {
    const {request} = useHttp();
    const {token} = useContext(AuthContext);

    // const [state, setState] = useState({
    //     description: training?.description
    // })
    const [newTraining, setNewTraining] = useState(training)

    useEffect(() => {
        setNewTraining(training)
    }, [training])

    const changeHandler = (event) => {
        setNewTraining({...newTraining, [event.target.name]: event.target.value})
    }
    const updateValue = async () => {
        try {
            await request(`/api/trainings/${training.id}`, "POST",
                newTraining
                , {
                    Authorization: `Bearer ${token}`,
                });
        } catch (e) {
        }
    }
    console.log(training)
    return (
        <div className="content container ">
            <Card className="bg-dark text-white">
                <Card.Header as="h3">Тренировка:
                    <h5 style={{marginTop: 10}}>{newTraining?.name}</h5>
                    <h5 name={"name"} value={newTraining?.name || ""} onChange={changeHandler}
                           placeholder="Изменить тренера"
                           className="white-text"/>

                </Card.Header>
                <Card.Body style={{marginLeft: "5rem"}}>


                    <h5 style={{marginTop: 10}}>Тип тренировки: {newTraining?.category} </h5>

                    <h5 style={{marginTop: 10}}>Тренер::
                    <input style={{marginTop: 10}} name={"trainer"} value={newTraining?.trainer || ""} onChange={changeHandler} placeholder="Изменить тренера"
                           className="white-text"/>
                        </h5>

                    <h5 style={{marginTop: 10}}>Описание тренировки:
                        <input name={"description"} value={newTraining?.description || ""} onChange={changeHandler}
                               placeholder="Изменить описание тренировки"
                               id="first_name" type="text" className="white-text"/>
                    </h5>

                    <h5 style={{marginTop: 10}}>Упражнения</h5>
                    {
                        training?.exercises.map((exercise, index) => {
                            // console.log(exercise)
                            return (
                                <Card key={index}>
                                    <Card.Header>
                                        <h5 className="black-text">{exercise.name}</h5>
                                    </Card.Header>
                                    <div>
                                        {/*<Card.Body className="black-text">Разминка всех мышцы с растяжкой</Card.Body>*/}
                                        {/*<textarea*/}
                                        {/*    name={exercise.id}*/}
                                        {/*    onChange={changeHandler}*/}
                                        {/*    value={state[exercise.id]}*/}
                                        {/*    className="form-control"*/}
                                        {/*    aria-label="With textarea"*/}
                                        {/*></textarea>*/}
                                    </div>
                                </Card>)
                        })
                    }
                    <Button variant="secondary" onClick={updateValue}>Сохранить изменения</Button>{' '}
                    <Button variant="primary" href="/training">
                        К тренировкам
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}