import React,{useState} from "react";

import { Tab, Card, Row, Col, Form, Container, Button } from "react-bootstrap";
import { render } from "react-dom";

// Import data
import {programs, cards} from "../files/programs"
import MySmallCard from "./MySmallCard";

const MyCard = ({eventKey, obj, type}) =>{
    // console.log(`obj in my card:`);
    // console.log(obj);
    const user = JSON.parse(window.localStorage.getItem("user"))

    const updateCard = (e) =>{
        e.preventDefault()
        fetch('http://localhost:3000'+obj.self, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId: user, title: title, sport: sport, date: date, comment: description}),
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data){
            // console.log(data);
            window.location.reload()
        })
    }

    const [description, setDescription] = useState(obj.comment)
    const [sport, setSport] = useState(obj.sport)
    const [title, setTitle] = useState(obj.title)
    const [date, setDate] = useState(obj.date)

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
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {/* {obj.title} */}
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
                        <Card.Subtitle className="my-4 text-muted d-flex justify-items-center align-items-center">
                            Date:
                            <Form.Control 
                                as="textarea"
                                className="ms-2"
                                rows={1} 
                                defaultValue={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            {/* {obj.sport} */}
                        </Card.Subtitle>
                        <Row>
                            <Col xs="auto" className="d-flex align-items-center pe-0">
                                <Form.Label className="mb-0" htmlFor="exampleColorInput">Colore:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control style={{display: "inline-block"}}
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue={obj.color}
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
                        </Form>
                        <Card.Subtitle className="mt-2 text-muted">
                            {type == "program" ? <p>Schede</p> : ""}
                        </Card.Subtitle>
                        <div className="mt-2">
                            {type == "program" ? obj.programCards.map((card) =>(
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