import React, { useState, createRef, useEffect, useCallback } from 'react';


const VerificationLoginModal = ({ setIsVerifiying, setIsVerified, credentials, modalFirstInputRef }) => {

    const [codes, setCodes] = useState(Array(5).fill(''));
    const inputRefs = Array(5).fill().map(() => createRef());

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            setIsVerifiying(false);
            setIsVerified(false);
        }
    }, [setIsVerifiying, setIsVerified]);

    const handleFocusChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        // Move focus if value is inserted
        if (value && index < 4) {
            inputRefs[index + 1].current.focus();
        }
    };

    const submitCode = async () => {
        const code = codes.join('');

        const response = await fetch(`${process.env.REACT_APP_SERVER}users/verificationcode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password, code: +code }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            setIsVerifiying(false);
            setIsVerified(true);
        } else {
            console.error("Verification failed. Try again.");
        }

    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        inputRefs[0].current.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        const allCodesFilled = codes.every(code => code.trim() !== '');
        if (allCodesFilled) {
            submitCode();
        }
    }, [codes]);

    return (
        <div className="position-absolute px-2" id="verificationModal">
            <div className='text-center'>
                <h2 >Insert your verification code</h2>

                <div id="codeInputContainer" className='my-4' >
                    {codes.map((code, index) => (
                        <input
                            key={index}
                            type="text"
                            ref={inputRefs[index]}
                            maxLength="1"
                            value={code}
                            onChange={(e) => handleFocusChange(index, e.target.value)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>
                {/* <button onClick={sendVerificationEmail} className='text-center'>Send email again</button> */}
                {/* add a timeOut to not spam the button but if close modal and open again still timed. */}
            </div>
        </div>
    )
}

export default VerificationLoginModal