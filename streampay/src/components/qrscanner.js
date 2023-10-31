import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
const mediaConstraints = {
    video: {
      facingMode: 'environment', // Set this to 'environment' for the back camera
    },
  };
const QrcodeScanner = ({setqrdata}) => {
  const [data, setData] = useState('No result');

  return (
    <div style={{display:"none"}}>
      <QrReader

        onResult={(result, error) => {
          if (!!result) {
            setqrdata(result?.text);
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={mediaConstraints} // Pass the constraints to the QrReader component
       
        style={{ width: '0%' , display:"none" }}
      />
      <p>{data}</p>
    </div>
  );
};
export default QrcodeScanner;