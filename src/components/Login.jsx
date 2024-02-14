import React, { useEffect } from 'react';
import { Container, Col, Row, Image } from "react-bootstrap"
import LoginFormBox from "./LoginFormBox";

const Login = () => {

    useEffect(() => {
        //Remove token always, even if you navigate back
        localStorage.removeItem('accessToken');
    }, [])

    return (
        <>

            {/* ONLY extra-small screens */}
            <Container fluid className="d-sm-none loginBG text-white">
                <Image className="pt-3" style={{ maxHeight: "20vh", maxWidth: "25vw" }} src="" alt="Company logo"></Image>

                <div className="transparencywWhiteBox p-3 mt-5">
                    <LoginFormBox />
                </div>

            </Container>

            {/* SINCE small screens */}
            <Container fluid className="d-none d-sm-block">
                <Row>
                    <Col className="d-flex flex-column">
                        <Image className="mb-4 mt-3 ml-auto mr-auto" style={{ maxHeight: "20vh", maxWidth: "25vw" }} src="" alt="Company logo"></Image>
                        <LoginFormBox />
                    </Col>

                    <Col className="login-container loginBG"></Col>
                </Row>
            </Container>

        </>)
}

export default Login