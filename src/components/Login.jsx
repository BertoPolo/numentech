import { Container, Col, Row, Image } from "react-bootstrap"
import { useNavigate, } from "react-router-dom"
import LoginFormBox from "./LoginFormBox";

const Login = () => {

    const navigate = useNavigate()

    return (
        <>

            {/* ONLY extra-small screens */}
            <Container fluid className="d-sm-none loginBG">
                <h1 className="h1XsScreen">Numentech</h1>

                <div className="transparencywWhiteBox p-3 mt-5">
                    <LoginFormBox />
                </div>

            </Container>

            {/* SINCE small screens */}
            <Container fluid className="d-none d-sm-block">
                <Row>
                    <Col className="d-flex flex-column">
                        <Image class="mb-4 mt-2 ml-auto mr-auto" style={{ maxHeight: "20vh", maxWidth: "25vw" }} src="https://numentech.es/wp-content/uploads/2022/09/Recurso-20.png" alt="Numentech"></Image>
                        <LoginFormBox />
                    </Col>

                    <Col className="login-container loginBG"></Col>
                </Row>
            </Container>

        </>)
}

export default Login