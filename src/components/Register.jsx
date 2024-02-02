import { Form, Button, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

const CreateUser = () => {
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [isCharging, setIsCharging] = useState(false)


    const navigate = useNavigate()
    const registerBtnRef = useRef()
    const backBtnRef = useRef()

    const isValidEmail = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const ableBtn = e => {
        if (registerBtnRef.current) {
            registerBtnRef.current.removeAttribute("disabled");
            backBtnRef.current.removeAttribute("disabled");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        registerBtnRef.current.setAttribute("disabled", "disabled");
        backBtnRef.current.setAttribute("disabled", "disabled");
        setIsCharging(true)
        let body = {
            email: emailInput,
            password: passwordInput,
        };

        try {
            const res = await fetch(
                `${process.env.REACT_APP_SERVER}users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(body),
                }
            );
            if (res.ok) {
                console.log("Welcome !!")
                navigate("/")
            } else {
                console.log("user already exists")
                ableBtn()
                setIsCharging(false)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="d-flex justify-content-center align-items-center registerBg" style={{ minHeight: "100vh" }}>
            <div className="login-container text-center transparencywWhiteBox p-3">

                <Form className="p-4" onSubmit={(e) => handleSubmit(e)} style={{ opacity: isCharging ? "0.5" : "1" }}>
                    <h4 className="mb-3">Sign Up</h4>

                    <Form.Group>
                        <Form.Control className="mb-2" type="email" placeholder="Email" onChange={(e) => setEmailInput(e.target.value)} />
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
                    </Form.Group>

                    <div className="mt-4">

                        <Button className="buttonLogin border-0" type="submit" ref={registerBtnRef} disabled={!isValidEmail(emailInput) || (!passwordInput)}>
                            Register
                        </Button>

                        <Link className="ml-2" to="/">
                            <Button className="border-0 btnBack" ref={backBtnRef}>
                                Go Back
                            </Button>
                        </Link>
                    </div>
                </Form >
                {isCharging && <Spinner animation="border" variant="success" className="position-absolute" />}
            </div>
        </div>

    )
}
export default CreateUser