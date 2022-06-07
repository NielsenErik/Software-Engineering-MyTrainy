// Fetch per aggiungere una Card (POST)

import React,{useState, useEffect} from "react";
import useLocalStorage from '../useLocalStorage';

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

// Import react-bootstrap
import {Tab, Row, Col, Nav, Button, Modal, Form} from "react-bootstrap"

// Import Components
import SideRow from "./SideRow";
import MyCard from "./MyCard";

// Import data
import {programs, cards} from "../files/programs" 
import ProgramCard from "./ProgramCard";


const Sidebar = ({userCards, setUserCards, userPrograms, setUserPrograms}) =>{

    const user = JSON.parse(window.localStorage.getItem("user"))

    var programCounter = 0;
    var programCounterPane = 0;
    var cardCounter = 0;
    var cardCounterPane = 0;

    // New Card Info
    const [titleCard, setTitleCard] = useState();
    const [sport, setSport] = useState();
    const [newColor, setNewColor] = useState("#000000")
    const [comment, setComment] = useState();

    // New Program Info
    const [titleProgram, setTitleProgram] = useState()
    const [programSport, setProgramSport] = useState()
    const [newProgramColor, setNewProgramColor] = useState()
    const [programComment, setProgramComment] = useState()

    // const [date, setDate] = useState();
    const [lastCreated, setLastCreated] = useLocalStorage(user, "")
    
    // Alert state
    const [show, setShow] = useState(false);
    const [programShow, setProgramShow] = useState(false)
    


    // alert card handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // alert program handlers
    const programHandleClose = () => setProgramShow(false)
    const programHandleShow = () => setProgramShow(true)
    
    
    const [newStartDate, setNewStartDate] = useState(new Date())
    const [newEndDate, setNewEndDate] = useState(newStartDate)
    
    // const addComponent = (type) =>{
        //     console.log(`Aggiungere un componente di tipo ${type}`);
        // }
    // Add new Card
    var isCardCreated = true;
    const addCardHandler = (e) =>{
        // console.log("dentro addHandler")
        e.preventDefault()
        fetch('../api/v2/card/'+user, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { userId: user, title: titleCard, sport: sport, startDate: newStartDate, endDate: newEndDate,  comment: comment, color: newColor,} ),
        })
            // .then((resp) => resp.json())
            .then(function(data){
                // 
                // console.log(data);
                // console.log("dentro il then, chiusura popup")
                
            })
            .catch( error => {console.error(error); isCardCreated = false});
            console.log("fine addHandler")
            if(isCardCreated){
                handleClose()
                setNewColor("#000000")
                window.location.reload()
                // setLastCreated(`card${++cardCounter}`)
            }      
    }
    // Add new Program
    const addProgramHandler = (e) =>{
        e.preventDefault()
        // alert("Create Program")
        fetch('../api/v1/program/'+user, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId: user, title: titleProgram, sport: programSport, color: newProgramColor, comment: programComment})
        })
        .then((resp) => resp.json())
        .then(function(data){
            console.log(data.title)
            handleClose()
            // alert(`program ${data.title} created`)
            setNewColor("#000000")
            window.location.reload()
                // setLastCreated(`program${++programCounter}`)
        })
        .catch(error => alert(error))
    }

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
                                        onClick={programHandleShow}
                                    >
                                        Add
                                    </Button>
                                    <Modal show={programShow} onHide={programHandleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Nuovo Programma di allenamento</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form onSubmit={addProgramHandler}>
                                                    <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                                                        <Form.Label>Title</Form.Label>
                                                        <Form.Control type="text" placeholder="Title" onChange={(e) => setTitleProgram(e.target.value)}/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Sport</Form.Label>
                                                        <Form.Control type="text" placeholder="Sport" onChange={(e) => setProgramSport(e.target.value)}/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicColor">
                                                        <Form.Label className="mb-0" htmlFor="exampleColorInput">Colore:</Form.Label>
                                                        <Form.Control style={{display: "inline-block"}}
                                                            type="color"
                                                            id="exampleColorInput"
                                                            defaultValue={newColor}
                                                            onChange={(e) =>{setNewProgramColor(e.target.value)}}
                                                            title="Choose your color"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control type="text" placeholder="Comment" onChange={(e) => setProgramComment(e.target.value)}/>
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={addProgramHandler}>
                                                    Create
                                                </Button>
                                            </Modal.Footer>
                                    </Modal>

                                </div>
                                <div style={{maxHeight: "50vh", overflow: "scroll"}}>
                                    <div style={{display: "inline-flex"}}>
                                    </div>
                                    {
                                        userPrograms
                                        ?
                                        // console.log(userPrograms)
                                        userPrograms.map((program) =>(
                                            <Nav.Item>
                                                <Nav.Link eventKey={`program${++programCounter}`}>
                                                    <SideRow 
                                                        title={program.title} 
                                                        obj={program} 
                                                        counter={programCounter} 
                                                        setLastCreated={setLastCreated}
                                                        type="program"
                                                    />
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))
                                        :
                                        ""
                                    }
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
                                                    <Form.Group className="mb-3" controlId="formBasicColor">
                                                        <Form.Label className="mb-0" htmlFor="exampleColorInput">Colore:</Form.Label>
                                                        <Form.Control style={{display: "inline-block"}}
                                                            type="color"
                                                            id="exampleColorInput"
                                                            defaultValue={newColor}
                                                            onChange={(e) =>{setNewColor(e.target.value)}}
                                                            title="Choose your color"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formBasicPassword">

                                                        <div className="d-flex justify-items-center align-items-center" style={{display: "block"}}>
                                                            Start:
                                                            <div className="mb-4 ms-2 justify-items-center align-items-center">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DateTimePicker label="Start" value={newStartDate} onChange={(date) =>{setNewStartDate(date); setNewEndDate(date)}} showTodayButton/>
                                                                </MuiPickersUtilsProvider>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-items-center align-items-center" style={{display: "block"}}>
                                                            End:
                                                            <div className="ms-2 justify-items-center align-items-center">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DateTimePicker label="End" value={newEndDate} onChange={setNewEndDate}/>
                                                                </MuiPickersUtilsProvider>
                                                            </div>  
                                                        </div>
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
                                        {/* <div className="d-flex align-items-center pe-0 ms-2"></div> */}
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
                                    userPrograms
                                    ?
                                    // console.log(userPrograms)
                                    userPrograms.map((program) =>(
                                        <ProgramCard 
                                            eventKey={`program${++programCounterPane}`}
                                            obj={program}
                                        />
                                    ))
                                    :
                                    ""
                                }
                                {
                                    userCards
                                    ?
                                    userCards.map((card) =>(
                                            <MyCard
                                                eventKey={`card${++cardCounterPane}`}
                                                type="card"
                                                obj={card}
                                                counter={cardCounterPane}
                                                setUserCards={setUserCards}
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

