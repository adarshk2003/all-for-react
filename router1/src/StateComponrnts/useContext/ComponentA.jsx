import { useContext } from "react";
import {MyContext}from './UseContextApp'
export default function ComponentA() {
    const ContextValue = useContext(MyContext);
    return (
        <>
            <h1>{ ContextValue}</h1>
        </>
    )
}