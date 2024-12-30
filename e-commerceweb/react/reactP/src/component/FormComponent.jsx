import { useState } from "react";

export default function FormComponent({ onSubmit }) {
    console.log("form rendering.......");

    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        place: "",
        pincode:"",
    });

    const handleInputChange = (e) => {
        console.log("value", e.target.value);

        if (e.target.name === "name") {
            setInputData({
                ...inputData,
                name:e.target.value,
            })
        }

        if (e.target.name === "email") {
            setInputData({
                ...inputData,
                email: e.target.value,
            })
        }
        if (e.target.name === "place") {
            setInputData({
                ...inputData,
                place: e.target.value,
            })
        }
        if (e.target.name === "pincode") {
            setInputData({
                ...inputData,
                pincode: e.target.value,
            })
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");

        onSubmit(inputData);
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleInputChange} placeholder="enter your name" />
                <input type="text" name="email" onChange={handleInputChange} placeholder="enter your email" />
                <input type="text" name="place" onChange={handleInputChange} placeholder="enter your place" />
                <input type="text" name="pincode" onChange={handleInputChange} placeholder="enter your pincode" />
                <button type="submit">submit</button>
            </form>
        </>
    )
}