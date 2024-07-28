import { useState, useEffect } from "react";
import axios from "axios";

const Quote = () => {
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        const fetchQuotes = async () => {
            const response = await axios.get("https://api.adviceslip.com/advice");
            setAdvice(response.data.slip.advice);
        }
        fetchQuotes();
    }, [])

    return (
        <div className="flex flex-col items-center gap-4 justify-center mt-5 w-[80%]">
            <div className='flex items-center justify-center bg-black shadow-2xl p-6 rounded-lg h-48 w-full'>
                <h1 className='font-semibold text-center text-xl text-white'>'' {advice} ''</h1>
            </div>
        </div>
    )
}

export default Quote;