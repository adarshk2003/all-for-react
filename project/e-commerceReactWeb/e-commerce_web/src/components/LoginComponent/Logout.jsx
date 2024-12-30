import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Shaired/spinners/Loadspinning";

export default function Logout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        // Show the loading spinner for 3 seconds before logging out
        setTimeout(() => {
            if (token) {
                localStorage.removeItem("authToken");
                toast.success("Logged out successfully");
                setLoading(false);
                navigate('/');
            } else {
                toast.error("Token not available");
                setLoading(false);
                navigate('/');
            }
        }, 1000); 
    }, [navigate]);

    return (
        <>
            <LoadingSpinner />
             <h1>logging out ........</h1>
        </>
    );
}
