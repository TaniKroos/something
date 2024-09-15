import axios from "axios"
import { useEffect, useState } from "react"

export const Balance = ({value}) =>{
    const [bal,setBal] = useState(0);
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/account/getBalance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
                setBal(Number(res.data.balance)); // Assuming `balance` is a key in the response
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
        
        fetchBalance(); // Call the async function
    }, [bal]); 
 
 
    return (<div className="flex">
            <div className="font-bold text-lg">
                Your Balance
            </div>
            <div className="ml-2">
                $ {bal}
            </div>

    </div>)
}