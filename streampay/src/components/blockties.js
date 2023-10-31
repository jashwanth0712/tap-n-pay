import BlockiesSvgSync from 'blockies-react-svg/dist/es/BlockiesSvgSync.mjs'
import "../App.css"
export const MyBlockies = (props) => (
    <BlockiesSvgSync 
    address={props.address}
  //size={8}
  scale={5}
  //caseSensitive={false}
    className="blockies"    
    />
)