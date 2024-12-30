export default function DisplayComponent({ displayData }) {
    console.log("display rendering........");
    console.log("display name",displayData);

    
    return (
        <>
            <h1>hello buddy <br /> name is  .. {displayData.name} <br /> email: {displayData.email} <br /> place:{displayData.place}, { displayData.pincode}</h1>
        </>
    )
}