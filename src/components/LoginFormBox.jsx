import { Form, Button, Spinner } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

const FormBox = () => {
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [isCharging, setIsCharging] = useState(false)
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()



    const isValidEmail = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const createToken = async (e) => {
        e.preventDefault()
        setIsCharging(true)
        try {

            const body = {
                email: emailInput,
                password: passwordInput
            }

            const response = await fetch(`${process.env.REACT_APP_SERVER}users/login`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(body),

            });

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('selfAccount', data.email); //not the most secure
                navigate("/home")
                setIsCharging(false)

            } else {
                console.log("Check your credentials again")
                setIsCharging(false)
                setIsError(true)
                setTimeout(() => setIsError(false), 3000)
            }

        } catch (error) { console.log(error) }
    }

    return (
        <>
            <Form className="login-container" onSubmit={createToken} style={{ opacity: isCharging ? "0.5" : "1" }}>
                <div className="login-modal">
                    <h3 className="mb-3 d-flex">Welcome!</h3>

                    <Form.Group>
                        <div className="d-flex"><Form.Label>Email</Form.Label></div>
                        <Form.Control type="email" placeholder="fernando23@num.be" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <div className="d-flex"><Form.Label>Password</Form.Label></div>
                        <Form.Control type="password" placeholder="****" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                    </Form.Group>


                    <div className="d-flex justify-content-around">
                        <Button className="border-0 btnSignup" onClick={() => navigate("/register")} disabled={isCharging}>Sign up</Button>

                        <Button className="border-0 buttonLogin" type="submit" disabled={!isValidEmail(emailInput) || (!passwordInput) || isCharging} >
                            Login
                        </Button>
                    </div>

                    <Link className="mt-4 d-block text-center" to="/home"><small>I don't have an account</small></Link>

                    {/* <small className="text-muted text-center login-small-font d-block mt-3">© 2024 ALL RIGHTS RESERVED</small> */}
                </div >
                {isCharging && <Spinner className="position-absolute" animation="border" variant="success" />
                }
                {isError && <Spinner className="position-absolute" animation="grow" variant="danger" />}
            </Form >





        </>
    )
}

export default FormBox