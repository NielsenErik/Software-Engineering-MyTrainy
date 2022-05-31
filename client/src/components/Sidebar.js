import React from "react";
// import LibrarySong from "./LibrarySong";

// Import react-bootstrap
import {Tab, Row, Col, Nav, Container, Button} from "react-bootstrap"

// Import Components
import SideRow from "./SideRow";
import MyCard from "./MyCard";

// Import data
import {programs, cards} from "../files/programs"


const Sidebar = ({userCards}) =>{

    var programCounter = 0;
    var programCounterPane = 0;
    var cardCounter = 0;
    var cardCounterPane = 0;
    
    const addComponent = (type) =>{
        console.log(`Aggiungere un componente di tipo ${type}`);
    }

    // console.log(userCards);
    return(
        <>
            <div style={{height: "90vh", width: "100%"}}>
                <Tab.Container id="program-and-cards">
                    <Row>
                        <Col md={3} xs={12}>
                            <Nav variant="pills" className="flex-column">
                                <div style={{display: "inline-flex"}}>
                                    <h3>Programmi</h3>
                                    <Button 
                                        variant="primary" 
                                        style={{padding: "0.3rem", color:"white"}}
                                        
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div style={{maxHeight: "50vh", overflow: "scroll"}}>
                                    <div style={{display: "inline-flex"}}>
                                    </div>
                                    {programs.map((program) =>(
                                        <Nav.Item>
                                            <Nav.Link eventKey={`program${++programCounter}`}><SideRow title={program.title} /></Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </div>
                                <div style={{display: "inline-flex"}}>
                                    <h3>Schede</h3>
                                    <Button 
                                        variant="primary" 
                                        style={{padding: "0.3rem", color:"white"}}
                                        
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div style={{height: "50vh", overflow: "scroll"}}>
                                        <div className="d-flex align-items-center pe-0 ms-2">
                                    </div>
                                    {
                                        userCards 
                                        ? 
                                        userCards.map((card) =>(
                                            <Nav.Item>
                                                <Nav.Link eventKey={`card${++cardCounter}`}>
                                                    <SideRow title={card.title} />
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))
                                        :
                                        ""
                                    }
                                </div>
                            </Nav>
                        </Col>
                        <Col xs={12} md={9}>
                            <Tab.Content>
                                {
                                programs.map((program) =>(
                                    <MyCard
                                        eventKey={`program${++programCounterPane}`}
                                        obj={program}
                                        type="program"
                                    />
                                ))}
                                {
                                    userCards
                                    ?
                                    userCards.map((card) =>(
                                            <MyCard
                                                eventKey={`card${++cardCounterPane}`}
                                                type="card"
                                                obj={card}
                                            />
                                    ))
                                    :
                                    ""
                                }
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    )
}

export default Sidebar;

