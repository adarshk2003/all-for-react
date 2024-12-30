import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import { createContext } from "react";

const MyContext = createContext('default');

export default function UseContextApp() {
    return (
        <>
            <MyContext.Provider value="from there ">
                <ComponentA />
                <ComponentB />
            </MyContext.Provider>
        </>
    )
}
export {MyContext}