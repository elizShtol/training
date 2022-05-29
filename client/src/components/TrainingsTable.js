import React from 'react'
import { Table } from "react-bootstrap";
import {Link} from 'react-router-dom'


export const TrainingsTable = ({trainings}) => {
    return (
        <Table variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th >Название тренировки</th>
            <th>Тренер</th>
            <th>Дата</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        { trainings.map((training, index) => {
         
         return(<tr key={index}>
            <td>{index+1}</td>
            <td>{training.name}</td>
            <td>{training.trainer}</td>
            <td>{new Date(training.date).toLocaleDateString()}</td>
            <td>
              <Link to={`/detail/${training._id}`}>Открыть</Link>
            </td>
          </tr>)})
        }
        </tbody>
      </Table>
    )
}
