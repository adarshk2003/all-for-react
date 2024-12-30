import { useEffect ,useState} from "react"
export default function effectCOmponent() {
    console.log("component is rendering.......");
    const [data, setdatas] = useState(null)
    useEffect(() => {
        function fetchData() {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(async (data) => {
                console.log(data);
                let parsed_data = await data.json();
                console.log(parsed_data);
                setdatas(parsed_data);
            })
        }
        fetchData()
    },[])
    return (
        <>
            
        </>
    )
}