import React,{useState, useEffect} from "react";

import { Navbar, Container,NavDropdown, Nav, Button, Modal } from "react-bootstrap"

import { useNavigate } from "react-router-dom";

import useLocalStorage from '../useLocalStorage';
import { HashLink as Link } from 'react-router-hash-link';


import logo from '../media/logo.svg'


const MyNavbar = () =>{
    const navigate = useNavigate();
    
    // User info
    const user = JSON.parse(window.localStorage.getItem("user"))
    const [email, setEmail] = useState()
    const [type, setType] = useLocalStorage('type', "")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() =>{
        fetch('../api/v1/users/'+user,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        })
        .then((resp) => resp.json())
        .then(function(data){
            // console.log(data)
            setEmail(data.user.email)
            setType(data.user.userType)
        })
        .catch(error => alert(error))
    }, [])

    const logOutHandler = (e) =>{
        e.preventDefault()
        window.localStorage.clear()
        navigate('/')
        // window.location.reload()
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
            {/* <Navbar.Brand href="/calendar">MyTrainy</Navbar.Brand> */}
            <Link to="/calendar">
                <Navbar.Brand href="#def">
                    <img src={logo} alt="logo" style={{
                        maxWidth: "50%",
                        maxHeight: "50%"
                    }}/>
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                    <Link to="/prog-card-dash">
                        <Nav.Link href="#def">Programmi</Nav.Link>
                    </Link>
                    <Link to="/courses">
                        <Nav.Link href="#def">Corsi</Nav.Link>
                    </Link>
                    <Link to="/diary">
                        <Nav.Link href="#def">Diario</Nav.Link>
                    </Link>
                    <NavDropdown title="Profilo" id="collasible-nav-dropdown">
                        <NavDropdown.Item style={{cursor: "text"}}>
                            {
                                email
                                ?
                                <p>{email}</p>
                                :
                                ""
                            }
                        </NavDropdown.Item>
                        <NavDropdown.Item style={{cursor: "text"}}>
                            {
                                type
                                ?
                                <p>{type}</p>
                                :
                                ""
                            }
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/home" style={{cursor: "pointer"}} onClick={(e) =>{
                            e.preventDefault()
                            window.localStorage.clear()
                            navigate('/home')
                            // window.location.reload()
                        }}>LogOut</NavDropdown.Item>
                    </NavDropdown>
                    <Button className="text-light" onClick={handleShow}>Nuovo</Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Punto in cui mettere tutte le cose per creare una card</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;