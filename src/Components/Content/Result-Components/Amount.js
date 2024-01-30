import { useEffect, useReducer } from "react";
import plusImg from '../../assets/plus.png'
import minusImg from '../../assets/minus.png'
import './Amount.css'

//Setting Amount of exchanging value
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
            {/* <h2>Amount</h2> */}
            <>
                <img src={minusImg} alt="" className="amount-button" onClick={() => {
                    if (amount && amount.value >= 2) {
                        dispatch({ type: 'DECREMENT' })
                    } else {
                        console.log("Nie możesz mieć liczby mniejszej niż 1")
                    }

                }}/>
                <input
                    className='amount-input'
                    type="text"
                    value={amount.value}
                    onChange={handleInputChange}
                />
                <img src={plusImg} alt="" className="amount-button" onClick={() => dispatch({ type: 'INCREMENT' })}/>
            </>
        </>
    )
}