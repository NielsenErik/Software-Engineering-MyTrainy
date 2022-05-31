import { Navbar, Container,NavDropdown, Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom";

const NavPreLog = () =>{
    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">MyTrainy</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link to="/">About Us</Nav.Link>
                        <div style={{paddingRight:"1rem"}}>
                            <Link id="login" to="/login"><Button className="text-light">Accedi</Button></Link>
                        </div>
                        <Link id="registration" to="/singup"><Button className="text-light">Registrati</Button></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavPreLog;