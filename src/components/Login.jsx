import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Image } from "react-bootstrap"

import LoginFormBox from "./LoginFormBox";
import VerificationLoginModal from "./VerificationLoginModal"


const Login = () => {
    const [isVerifiying, setIsVerifiying] = useState(true)

    const handleVerifyingState = (data) => {
        setIsVerifiying(data);
        console.log('Data received from child:', data);
    };

    useEffect(() => {
        //Remove token always, even if you navigate back
        localStorage.removeItem('accessToken');
    }, [])

    return (
        <>
            <div style={{ opacity: isVerifiying ? "0.5" : "1" }}>

                {/* ONLY extra-small screens */}
                <Container fluid className="d-sm-none loginBG text-white">
                    <Image className="pt-4" style={{ maxHeight: "20vh", maxWidth: "25vw" }} src="/company-logo.png" alt="Company logo" />

                    <div className="transparencywWhiteBox p-3 mt-4">
                        <LoginFormBox isVerifiying={handleVerifyingState} />
                    </div>

                </Container>

                {/* SINCE small screens */}
                <Container fluid className="d-none d-sm-block">
                    <Row>
                        <Col className="d-flex flex-column">
                            <Image className="mb-4 mt-3 ml-auto mr-auto" style={{ maxHeight: "20vh", maxWidth: "25vw" }} src="/company-logo.png" alt="Company logo" />
                            <LoginFormBox isVerifiying={handleVerifyingState} />
                        </Col>

                        <Col className="login-container loginBG"></Col>
                    </Row>
                </Container>
            </div>

            {isVerifiying && <VerificationLoginModal isVerifiying={handleVerifyingState} />}
        </>
    )
}

export default Login