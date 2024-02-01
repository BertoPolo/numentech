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
        <>
            <div className="login-container">

                <Form className="p-4 mt-4 rounded" onSubmit={(e) => handleSubmit(e)}>
                    <h4 className="mb-3">Sign Up</h4>

                    <Form.Group>
                        <Form.Control type="email" placeholder="Email" onChange={(e) => setEmailInput(e.target.value)} />
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
                    </Form.Group>

                    <div>

                        <Button variant="success" type="submit" ref={registerBtnRef} disabled={!passwordInput || !emailInput}>
                            Register
                        </Button>

                        <Link className="ml-2" to="/">
                            <Button variant="danger" ref={backBtnRef}>
                                Go Back
                            </Button>
                        </Link>
                    </div>
                </Form >
                {isCharging && <Spinner animation="border" variant="success" className="position-absolute" />}
            </div>
        </>

    )
}
export default CreateUser