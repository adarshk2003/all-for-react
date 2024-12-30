import { useContext } from "react";
import { MyContext } from './UseContextApp'

export default function ComponentB() {
    const ContextValue = useContext(MyContext);
    return (
        <>
            <h1>{ ContextValue}</h1>
        </>
    )
}