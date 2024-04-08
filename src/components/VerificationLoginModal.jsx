import React, { useState, createRef, useEffect } from 'react';

const VerificationLoginModal = ({ isVerifiying }) => {
    const [codes, setCodes] = useState(Array(5).fill(''));

    const inputRefs = Array(5).fill().map(() => createRef());


    const handleFocusChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        // Move focus if value is inserted
        if (value && index < 4) {
            inputRefs[index + 1].current.focus();
        }
    };

    const submitCode = () => {
        const code = codes.join('');
        console.log("Inserted code: ", code);
        // verifying call
        isVerifiying(false)
    };

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