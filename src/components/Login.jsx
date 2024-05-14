import React, { useEffect, useState, useRef } from 'react';
import { Container, Col, Row, Image } from "react-bootstrap"

import LoginFormBox from "./LoginFormBox";
import VerificationLoginModal from "./VerificationLoginModal"


const Login = () => {
    const [isVerifiying, setIsVerifiying] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const modalFirstInputRef = useRef(null);

    const handleVerifyingState = (data) => {
        setIsVerifiying(data);
    };

    const handleVerifiedState = (data) => {
        setIsVerified(data);
    };

    const handleCredentials = (email, password) => {
        setCredentials({ email, password });
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
                    <Image className="pt-4" style={{ maxHeight: "20vh", maxWidth: "25vw" }} src="/taskwave_nobg.png" alt="Company logo" />

                    <div className="transparencywWhiteBox p-3 mt-4">
                        <LoginFormBox setIsVerifiying={handleVerifyingState} setIsVerified={handleVerifiedState} isVerifiying={isVerifiying} isVerified={isVerified} handleCredentials={handleCredentials} modalFirstInputRef={modalFirstInputRef} />
                    </div>

                </Container>

                {/* SINCE small screens */}
                <Container fluid className="d-none d-sm-block">
                    <Row>
                        <Col className="d-flex flex-column justify-content-center">
                            <Image className="mb-4 ml-auto mr-auto" style={{ maxHeight: "20vh", maxWidth: "25vw" }} src="/taskwave_nobg.png" alt="Company logo" />
                            <LoginFormBox setIsVerifiying={handleVerifyingState} setIsVerified={handleVerifiedState} isVerified={isVerified} handleCredentials={handleCredentials} modalFirstInputRef={modalFirstInputRef} />
                        </Col>

                        <Col className="login-container loginBG"></Col>
                    </Row>
                </Container>
            </div>

            {isVerifiying && <VerificationLoginModal setIsVerifiying={handleVerifyingState} setIsVerified={handleVerifiedState} credentials={credentials} modalFirstInputRef={modalFirstInputRef} />}
        </>
    )
}

export default Login