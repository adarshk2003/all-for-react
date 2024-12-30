import { useState } from "react";
function UseStateCompo(){
    console.log("rendring .........");
    const [count, setCount] = useState(0);
    const handleClick=() => {
        setCount((prevCount) => prevCount + 1)
        setCount((prevCount) => prevCount + 1)
    }
    return (
        <>
            <h1>{count }</h1>
            <button onClick={handleClick}>increment+</button>
        </>
    )
}
export default UseStateCompo;

