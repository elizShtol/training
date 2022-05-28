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
            <txh>Тренер</txh>
            <th>Дата</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        { trainings.map((training, index) => {
         
         return(<tr>
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
