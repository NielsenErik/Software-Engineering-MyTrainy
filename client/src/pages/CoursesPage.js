import React, {useState, useEffect} from "react"
import { Container, Modal, Button, FloatingLabel, Form, ListGroup } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";

import CourseRow from '../components/CourseRow'

var coursesCreated = 0;

const CoursesPage = () =>{

    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Courses Info
    const [title, setTitle] = useState()
    const [sport, setSport] = useState()
    const [comment, setComment] = useState()

    // All courses 
    const [courses, setCourses] = useState(undefined)

    const user = JSON.parse(window.localStorage.getItem("user"))
    const type = JSON.parse(window.localStorage.getItem("type"))

    const createCourse = (e) =>{
        e.preventDefault()

        fetch(`../api/v1/course/${user}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user,
                title: title,
                sport: sport,
                comment: comment,
            }),
        })
        .then((resp) => resp.json())
        .then(function(data){
            console.log(data)
            // if(data.success){
                handleClose()
                window.location.reload()
            // }
        })
    }

    useEffect(() =>{
        fetch(`../api/v1/userCourses/${user}`,{
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then(resp => resp.json())
        .then(function(data){
            setCourses(data)
        })
        .catch(error => alert(error))
    }, [])


    return(
        <Container>
            <MyNavbar />
            <p>Pagina dei corsi</p>
            {
                type !== 'Athlete'
                ?
                <div className="mb-3 d-inline">
                    <div>
                        <Button variant="outline-primary" onClick={handleShow}>Crea</Button>
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
                                <Button variant="primary" onClick={createCourse}>Save Changes</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                    <div className="my-3">
                    <ListGroup>
                        {
                            courses
                            ?
                            // () => (<ListGroup.Item>{courses}</ListGroup.Item>)
                            // console.log(courses)
                            courses.map((course) =>(
                                <div className="d-flex">
                                    <CourseRow obj={course}/>                      
                                </div>
                            ))
                            :
                            ""
                        }
                    </ListGroup>
                    </div>
                </div>
                :
                ""
            }
        </Container>
    )
}

export default CoursesPage;