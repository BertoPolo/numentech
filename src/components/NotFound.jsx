import { Container, Button, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <>
            <Container className="pt-4">
                <h1 className="d-flex justify-content-center align-content-center">404 NOT FOUND</h1>
                {/* <Image src="" alt="" /> */}
                <Button variant="primary" onClick={() => navigate("/home")}> Return home</Button>
            </Container>
        </>
    )
}

export default NotFound