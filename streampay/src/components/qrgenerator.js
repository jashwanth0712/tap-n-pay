import QRCode from "react-qr-code";
const QRcodeComponent=(props)=>{
    return(
        <div style={{ height: "auto", margin: "0 auto", width: "80%" }}>
    <QRCode
    size={512}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={props.value}
    viewBox={`0 0 256 256`}
    />
</div>
    )
}
export default QRcodeComponent;