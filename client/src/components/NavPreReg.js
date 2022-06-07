import React from "react"
import { Navbar, Container,NavDropdown, Nav, Button } from "react-bootstrap"
import { HashLink as Link } from 'react-router-hash-link';

const NavPreReg = () =>{
    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">MyTrainy</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/info">
                            <Nav.Link href="#def">info su MyTrainy</Nav.Link>
                        </Link>
                        <Link to = "/about">
                            <Nav.Link href="#def">About Us</Nav.Link>
                        </Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavPreReg;