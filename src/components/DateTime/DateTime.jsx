import { useState, useEffect } from "react";
import "./DateTime.scss";

const DateTime = () => {
	var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div className="time">
            <h2> Date : {date.toLocaleDateString()}</h2>
            <h2> Time : {date.toLocaleTimeString()}</h2>
        </div>
    )
}

export default DateTime;