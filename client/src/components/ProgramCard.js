import React,{useState} from "react"
import { Tab, Card, Row, Col, Form, Container, Button, DropdownButton, Dropdown} from "react-bootstrap";

const ProgramCard = ({eventKey, obj}) =>{
    const user = JSON.parse(window.localStorage.getItem("user"))

    const [title, setTitle] = useState(obj.title)
    const [sport, setSport] = useState(obj.sport)
    const [color, setColor] = useState(obj.color)
    const [description, setDescription] = useState(obj.comment)

    const upDateProgram = (e) =>{
        e.preventDefault()
        fetch('../'+obj.self,{
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user,
                title: title,
                sport: sport,
                color: color,
                comment: description,
            })
        })
        .then((resp) => resp.json())
        .then(function(data){
            setTitle(data.title)
            setSport(data.sport)
            setDescription(data.comment)
            setColor(data.color)
            alert("Modifica avvenuta con successo")
            // alert(color)
            window.location.reload()
        })
        .catch(error => alert(error))

    }
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
                    </Card.Body>
                    <Card.Footer>
                        <div className="align-items-right">
                            <Button 
                                variant="primary" 
                                style={{color:"white"}}
                                onClick={upDateProgram}
                            >
                                    Save
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Tab.Pane> 
    )
}

export default ProgramCard;