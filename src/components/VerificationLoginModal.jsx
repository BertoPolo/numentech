import React, { useState, createRef } from 'react';

const VerificationLoginModal = () => {
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
        console.log("Código ingresado:", code);
    };
    return (
        <div className="position-absolute" id="verificationModal">
            <div>
                <h2>Ingrese el Código de Verificación</h2>
                <div id="codeInputContainer">
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
                <button onClick={submitCode}>Verificar</button>
            </div>
        </div>
    )
}

export default VerificationLoginModal