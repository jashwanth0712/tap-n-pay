import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb,
  useCircularInputContext
} from 'react-circular-input';

import { render } from "react-dom";
import React, { useState ,useEffect} from 'react';
function CustomComponent() {
    const { getPointFromValue, value } = useCircularInputContext();
    const point = getPointFromValue();
    if (!point) return null;
    return (
      <text
        {...point}
        textAnchor="middle"
        dy="0.35em"
        fill="rgb(61, 153, 255)"
        style={{ pointerEvents: "none", fontWeight: "bold" }}
      >
        {Math.round(value * 100)}
      </text>
    );
  }
export const CircularInputField=({initialvalue, updateValue }) => {
	const [value, setValue] = useState(initialvalue)
 // Run updateValue every time value changes
  useEffect(() => {
    console.log(value)
    updateValue(value);
  }, [value]);
	return (    
        <div className='Circularipnut'>
            <CircularInput value={value} onChange={setValue}/>
        </div>
	)
}
export default CircularInputField;
