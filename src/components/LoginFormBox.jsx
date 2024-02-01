import { Form, Button, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

const FormBox = () => {
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [isCharging, setIsCharging] = useState(false)
    const [isError, setIsError] = useState(false)

    const btnRef = useRef()
    const navigate = useNavigate()

    const ableBtn = e => {
        if (btnRef.current) {
            btnRef.current.removeAttribute("disabled");
        }
    }

    const logIn = async (token) => {

        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}users/username/${emailInput}`,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                });

            if (res.ok) {
                const data = await res.json()



                navigate("/home")

            } else {
                console.log("Check your credentials again")
                ableBtn()
                setIsCharging(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const createToken = async (e) => {
        e.preventDefault()
        btnRef.current.setAttribute("disabled", "disabled");
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
                logIn(data.accessToken)

            } else {
                console.log("Check your credentials again")
                ableBtn()
                setIsCharging(false)
                setIsError(true)
                setTimeout(() => setIsError(false), 3000)
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <Form className="login-container" onSubmit={createToken}>
                <div className="login-modal">
                    <h3 className="mb-3 d-flex">Welcome!</h3>

                    <Form.Group>
                        <div className="d-flex"><Form.Label>Email</Form.Label></div>
                        <Form.Control type="text" placeholder="fernando23@num.be" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <div className="d-flex"><Form.Label>Password</Form.Label></div>
                        <Form.Control type="password" placeholder="****" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                    </Form.Group>


                    <div className="text-center">

                        <Button className="addToCartButton border-0" type="submit" ref={btnRef} disabled={(!emailInput) || (!passwordInput)} >
                            Login
                        </Button>

                        <small className="text-muted login-small-font d-block mt-3">© 2024 ALL RIGHTS RESERVED</small>
                    </div>

                </div >
                {isCharging && <Spinner className="position-absolute" animation="border" variant="success" />
                }
                {isError && <Spinner className="position-absolute" animation="grow" variant="danger" />}
            </Form >





        </>
    )
}

export default FormBox