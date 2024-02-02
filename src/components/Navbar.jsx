import React from 'react'
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom"

const MyNavbar = () => {
    const navigate = useNavigate();
    const isUserLoggedIn = localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate("/");
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <Image
                        src="https://numentech.es/wp-content/uploads/2022/09/Recurso-20.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo de la empresa"
                        style={{ height: "7vh", width: "18vw" }}
                    />

                </Navbar.Brand>
                <Nav className="ms-auto">
                    {isUserLoggedIn ? (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            <BoxArrowRight className="me-2" /> Logout
                        </Button>
                    ) : (
                        <Button variant="outline-primary" onClick={() => navigate("/")}>
                            Login
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>)
}

export default MyNavbar