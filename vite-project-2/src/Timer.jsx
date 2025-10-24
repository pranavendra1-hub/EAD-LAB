import React, { useState,useEffect} from "react";

const Timer= () => {
    const [time, setTime] = useState(0);
    const [runing, setRunning] = useState(false);

    useEffect(function(){
        if (!runing) return;

        let timer=setInterval(function() {
            return setTime(function(t){
                return t+1;
            });
        }, 1000);

    return function(){
        clearInterval(timer);
    };    
    },[runing]);


    const start = () => {  setRunning(true); }
    const pause = () => {  setRunning(false); }
    const reset = () => {  setRunning(false); setTime(0); }
 
return(
        <div className="container">
            <div className="buttonClass">
                <center>
                    <h2>{time} Seconds</h2>
                    <div className="btnParent">
                        <button onClick={start}>start</button>
                        <button onClick={pause}>pause</button>
                        <button onClick={reset}>reset</button>
                    </div>
                </center>
            </div>
        </div>
    );
}
export default Timer; 