import React,{useState, useEffect} from "react";
import useLocalStorage from '../useLocalStorage';

// Import react-bootstrap
import {Tab, Row, Col, Nav, Button, Modal, Form} from "react-bootstrap"

// Import Components
import SideRow from "./SideRow";
import MyCard from "./MyCard";

// Import data
import {programs, cards} from "../files/programs"


const Sidebar = ({userCards, setUserCards}) =>{

    const user = JSON.parse(window.localStorage.getItem("user"))

    var programCounter = 0;
    var programCounterPane = 0;
    var cardCounter = 0;
    var cardCounterPane = 0;

    const [titleCard, setTitleCard] = useState();
    const [sport, setSport] = useState();
    const [comment, setComment] = useState();
    const [date, setDate] = useState();
    const [lastCreated, setLastCreated] = useLocalStorage(user, `card1`)

    // Alert state
    const [show, setShow] = useState(false);

    // alert handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var isCardCreated = true;
    
    const addComponent = (type) =>{
        console.log(`Aggiungere un componente di tipo ${type}`);
    }

    const addCardHandler = (e) =>{
        console.log("dentro addHandler")
        e.preventDefault();
        fetch('http://localhost:3000/api/v1/card/'+user, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { userId: user, title: titleCard, sport: sport, date:date, comment: comment } ),
        })
            // .then((resp) => resp.json())
            .then(function(data){
                // 
                // console.log(data);
                console.log("dentro il then, chiusura popup")
                
            })
            .catch( error => {console.error(error); isCardCreated = false});
            console.log("fine addHandler")
            if(isCardCreated){
                handleClose()
                window.location.reload()
                setLastCreated(`card${++cardCounter}`)
            }
    }

    useEffect(() =>{

    }, [])

    // console.log(userCards);
    return(
        <>
            <div style={{height: "90vh", width: "100%"}}>
                <Tab.Container id="program-and-cards" defaultActiveKey={lastCreated}>
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
                                        onClick={handleShow}
                                    >
                                        Add
                                    </Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Nuova Scheda di allenamento</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form onSubmit={addCardHandler}>
                                                    <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                                                        <Form.Label>Title</Form.Label>
                                                        <Form.Control type="text" placeholder="Title" onChange={(e) => setTitleCard(e.target.value)}/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Sport</Form.Label>
                                                        <Form.Control type="text" placeholder="Sport" onChange={(e) => setSport(e.target.value)}/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Date</Form.Label>
                                                        <Form.Control type="text" placeholder="Date" onChange={(e) => setDate(e.target.value)}/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control type="text" placeholder="Comment" onChange={(e) => setComment(e.target.value)}/>
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={addCardHandler}>
                                                    Create
                                                </Button>
                                            </Modal.Footer>
                                    </Modal>
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
                                                    <SideRow 
                                                        title={card.title} 
                                                        obj={card} 
                                                        counter={cardCounter} 
                                                        setLastCreated={setLastCreated}
                                                        type="card"
                                                    />
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
                                                counter={cardCounterPane}
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

