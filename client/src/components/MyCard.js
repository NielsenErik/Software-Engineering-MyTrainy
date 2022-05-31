import React,{useState} from "react";

import { Tab, Card, Row, Col, Form, Container } from "react-bootstrap";
import { render } from "react-dom";

// Import data
import {programs, cards} from "../files/programs"
import MySmallCard from "./MySmallCard";

const MyCard = ({eventKey, obj, type}) =>{
    // console.log(`obj in my card:`);
    // console.log(obj);
    return(
            <Tab.Pane eventKey={eventKey}>
                <Card style={{ width: '100%', height: "90vh", overflowY: "scrool" }}>
                    <Card.Body style={{overflow: "scroll"}}>
                        <Card.Title>{obj.title}</Card.Title>
                        <hr 
                            style={{
                                color: "#3A3A3A",
                                backgroundColor: "#3A3A3A",
                                height: "5"
                            }}
                        />
                        <Card.Subtitle className="mb-2 text-muted">{obj.sport}</Card.Subtitle>
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
                                defaultValue={obj.comment}
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    
                                }}
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

                </Card>
            </Tab.Pane>        
    )
}

export default MyCard;