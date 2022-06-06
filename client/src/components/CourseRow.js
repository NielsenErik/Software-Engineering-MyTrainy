import React,{useState} from "react"

import { Container, Modal, Button, FloatingLabel, Form, ListGroup } from "react-bootstrap";

const CourseRow = ({obj}) =>{

    const user = JSON.parse(window.localStorage.getItem("user"))

    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Courses Info
    const [title, setTitle] = useState()
    const [sport, setSport] = useState()
    const [comment, setComment] = useState()

    const deleteCourse = (e) =>{
        e.preventDefault()
        // console.log(obj);
        fetch('../'+obj.self, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then(resp => resp.json())
        .then(function(data){
            alert(`Course ${obj.title} deleted`)
            window.location.reload()
        })
        .catch(error => alert(error))
    }
    const updateCourse = (e) =>{
        e.preventDefault()
        fetch('../'+obj.self, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user, 
                title: title, 
                sport: sport,  
                comment: comment,
            }),
        })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            setTitle(data.title)
            setSport(data.sport)
            setComment(data.comment)
            handleClose()
            // alert("Modifica avvenuta con successo")
            // alert(color)
            window.location.reload()
        })
        .catch(error => console.log(error))
    }
    const getCourse = (e) =>{
        e.preventDefault()
        fetch('../'+obj.self, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then(resp => resp.json())
        .then(function(data){
            // console.log(data);
            alert(`Sport: ${data.courseSelected.sport} ; Comment: ${data.courseSelected.comment}`)
        })
        .catch(error => alert(error))
    }
    return(
        <>
            <ListGroup.Item onClick={getCourse}>{obj.title}</ListGroup.Item>
                <div className="ms-2">
                    <Button variant="outline-primary" onClick={handleShow}>Update</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Creazione Corso</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Title"
                                    className="mb-2"
                                >
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Title" 
                                        onChange={(e) => {setTitle(e.target.value)}}
                                    />
                                </FloatingLabel>
                                <FloatingLabel 
                                    controlId="floatingInput" 
                                    label="Sport"
                                    className="mb-2"
                                >
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Sport"
                                        onChange={(e) => {setSport(e.target.value)}}
                                    />
                                </FloatingLabel>
                                <FloatingLabel 
                                    controlId="floatingInput" 
                                    label="Comment"
                                    className="mb-2"
                                >
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Comment" 
                                        onChange={(e) => {setComment(e.target.value)}}
                                    />
                                </FloatingLabel>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={updateCourse}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="ms-2">
                    <Button variant="outline-primary" onClick={deleteCourse}>Delete</Button>
                </div>
        </>
    )
}

export default CourseRow