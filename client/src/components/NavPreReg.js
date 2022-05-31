import { Navbar, Container,NavDropdown, Nav, Button } from "react-bootstrap"

const NavPreReg = () =>{
    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">MyTrainy</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/info">info su MyTrainy</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavPreReg;