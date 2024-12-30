import { useState } from "react";
import DisplayComponent from "./DisplayComponent";
import FormComponent from "./FormComponent"

export default function ParentComponent() {
    console.log("parent component rendering ........");

    const [dataToDisplay, setDataToDisplay] = useState("");

    const handleSubmit = (data) => {
        setDataToDisplay(data);
    }

    return (
        <>
            <FormComponent onSubmit={handleSubmit} />
            <DisplayComponent displayData={dataToDisplay} />
        </>
    )
}