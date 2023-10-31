import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
const mediaConstraints = {
    video: {
      facingMode: 'user', // Set this to 'environment' for the back camera
    },
  };
const QrcodeScanner = ({setqrdata}) => {
  const [data, setData] = useState('No result');

  return (
    <>
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
       
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};
export default QrcodeScanner;