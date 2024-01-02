import { useEffect, useReducer, useState } from "react";






const reducer = (amount, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { value: amount.value + 1 };
        case 'DECREMENT':
            return { value: amount.value - 1 };
        case 'SET':
            return { value: action.payload };
        case 'DEFAULT-VALUE':
            return { value: 1 }
        default:
            return amount;
    }
};





export default function Amount({option1, option2, setAmount}) {
    const [amount, dispatch] = useReducer(reducer, { value: 1 });


    useEffect(function () {
        if (option1 !== null && option2 !== null) {
            dispatch({ type: 'DEFAULT-VALUE' })
        }
    }, [option1, option2])

    useEffect(function(){
        setAmount(amount.value)
    },[amount.value])


    function handleInputChange(e) {
        const newValue = parseInt(e.target.value, 10);
        dispatch({ type: 'SET', payload: isNaN(newValue) ? 0 : newValue });
    }


    return (
        <>
            <h2>Amount</h2>
            <div>
                <button onClick={() => {
                    if (amount && amount.value >= 2) {
                        dispatch({ type: 'DECREMENT' })
                    } else {
                        console.log("Nie możesz mieć liczby mniejszej niż 1")
                    }

                }}>-</button>
                <input
                    className='amount-input'
                    type="text"
                    value={amount.value}
                    onChange={handleInputChange}
                />
                <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
            </div>
        </>
    )
}