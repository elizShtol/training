import React from 'react'
import {Button,Modal,} from 'react-bootstrap'
import  { useState } from 'react'

export const Example=()=> {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
           
        </Modal>
      </>
    );
  }
  