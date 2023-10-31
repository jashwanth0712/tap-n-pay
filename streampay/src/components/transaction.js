import React, { useState, useEffect } from "react";
import "../App.css";
import stream from "../assets/stream.gif";
import { MyBlockies } from "./blockties";
import { formatBalance, formatChainAsNum, sliceString } from '../utils/unitsconvertor';

const TransactionCard = (props) => {
  const [isBlinking, setIsBlinking] = useState(true);

  // Toggle the blinking state every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="transaction-card">
      <div style={{ display: "flex", flexDirection: "column" ,justifyContent:"center",alignItems:"center"}}>
        <MyBlockies address={props.from} style={{ borderRadius: "10px" }} />
        <p>{sliceString(props.from)}</p>
      </div>
        {isBlinking&&<div className="dot green"></div>}
      <div className="image-container">
        <img src={stream} className="transaction-image" />
      <p style={{color:"grey"}}>5G$/hr</p>

      </div>
      <div style={{ display: "flex", flexDirection: "column",justifyContent:"center",alignItems:"center" }}>
        <MyBlockies address={props.to} />
        <p>{sliceString(props.to)}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
