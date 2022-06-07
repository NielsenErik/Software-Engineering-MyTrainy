// Fetch per aggiornare una Card (PATCH)

import React,{useState, Fragment} from "react";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

import useLocalStorage from "../useLocalStorage";

import { Tab, Card, Row, Col, Form, Container, Button, DropdownButton, Dropdown} from "react-bootstrap";

// Import components
import MySmallCard from "./MySmallCard";

// import time from '../files/time'


// console.log(time);

const MyCard = ({eventKey, obj, type, counter, setUserCards}) =>{

    const user = JSON.parse(window.localStorage.getItem("user"))

    // Aggiornare la Card
    const updateCard = (e) =>{
        e.preventDefault()
        fetch('../api/v2/card/'+obj.id, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user, 
                title: title, 
                sport: sport, 
                startDate: startDate, 
                endDate: endDate, 
                comment: description,
                color: color,
            })
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            setTitle(data.title)
            setSport(data.sport)
            setStartDate(data.startDate)
            setEndDate(data.endDate)
            setDescription(data.comment)
            setColor(data.color)
            alert("Modifica avvenuta con successo")
            // alert(color)
            window.location.reload()
        })
        .catch(error => console.log(error))
    }
    
    // Variabili di stato della Card
    const [description, setDescription] = useState(obj.comment)
    const [sport, setSport] = useState(obj.sport)
    const [title, setTitle] = useState(obj.title)
    const [startDate, setStartDate] = useState(obj.startDate)
    const [endDate, setEndDate] = useState(obj.endDate)

    const [color, setColor] = useState(obj.color)
    // console.log(`title: ${title} color: ${color}`);
  
    return(
            <Tab.Pane eventKey={eventKey}>
                <Card style={{ width: '100%', height: "90vh", overflowY: "scrool" }}>
                    <Card.Body style={{overflow: "scroll"}}>
                        <Card.Title className="mb-2 d-flex justify-items-center align-items-center">
                            Title: 
                            <Form.Control 
                                as="textarea"
                                className="ms-2"
                                rows={1} 
                                defaultValue={title}
                                onChange={(e) => {setTitle(e.target.value)}}
                            />
                        </Card.Title>
                        <hr 
                            style={{
                                color: "#3A3A3A",
                                backgroundColor: "#3A3A3A",
                                height: "5"
                            }}
                        />
                        <Card.Subtitle className="mb-2 text-muted d-flex justify-items-center align-items-center">
                            Sport:
                            <Form.Control 
                                as="textarea"
                                className="ms-2"
                                rows={1} 
                                defaultValue={sport}
                                onChange={(e) => setSport(e.target.value)}
                            />
                            {/* {obj.sport} */}
                        </Card.Subtitle>
                        <Card.Subtitle className="my-4 text-muted  justify-items-center align-items-center"> {/* d-flex */}
                            <div className="d-flex justify-items-center align-items-center" style={{display: "block"}}>
                                Start:
                                <div className="mb-4 ms-2 justify-items-center align-items-center">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker label="Start" value={startDate} onChange={(date) =>{setStartDate(date); setEndDate(date)}} showTodayButton/>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                            <div className="d-flex justify-items-center align-items-center" style={{display: "block"}}>
                                End:
                                <div className="ms-2 justify-items-center align-items-center">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker label="End" value={endDate} onChange={setEndDate}/>
                                    </MuiPickersUtilsProvider>
                                </div>  
                            </div>
                        </Card.Subtitle>
                        <Row>
                            <Col xs="auto" className="d-flex align-items-center pe-0">
                                <Form.Label className="mb-0" htmlFor="exampleColorInput">Colore:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control style={{display: "inline-block"}}
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue={color}
                                    onChange={(e) =>{setColor(e.target.value)}}
                                    title="Choose your color"
                                />
                            </Col>
                        </Row>
                        <Form>
                            <Form.Label className="mt-3">Descrizione:</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3} 
                                defaultValue={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {/* <Form.Label className="mt-3">Card counter: {counter}</Form.Label> */}
                        </Form>
                        <Card.Subtitle className="mt-2 text-muted">
                            {type === "program" ? <p>Schede</p> : ""}
                        </Card.Subtitle>
                        <div className="mt-2">
                            {type === "program" ? obj.programCards.map((card) =>(
                                    <MySmallCard 
                                        title={card.title}
                                        description={card.description}
                                        start={card.startDate}
                                        end={card.endDate}
                                        day={card.day}
                                    />
                            )) : ""}
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <div className="align-items-right">
                            <Button 
                                variant="primary" 
                                style={{color:"white"}}
                                onClick={updateCard}
                            >
                                    Save
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Tab.Pane>        
    )
}

export default MyCard;