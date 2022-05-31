import react,{useState} from "react";

import { Navbar, Container,NavDropdown, Nav, Button, Modal } from "react-bootstrap"


const MyNavbar = () =>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
            <Navbar.Brand href="/calendar">MyTrainy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/prog-card-dash">Programmi</Nav.Link>
                    <Nav.Link href="/courses">Corsi</Nav.Link>
                    <Nav.Link href="/diary">Diario</Nav.Link>
                    <NavDropdown title="Profilo" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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