import React,{Component} from "react";
import Tilt from 'react-tilt';
import "./Logo.css";
import code from "./coding.png";

class Logo extends Component {
  render(){
    return (
      <div className="App">
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
          <div className="Tilt-inner pa3"><img src={code} alt=""/> </div>
        </Tilt>
      </div>

    )
  }
}


export default Logo;
