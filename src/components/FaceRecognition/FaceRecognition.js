import React,{Component} from "react";
import "./FaceRecognition.css"
class FaceRecognition extends Component{
  render(){
    return(
      <div className="center ma">
        <div className="absolute mt2">
          <img id="faceRecogImage" alt="" src={this.props.imageUrl} width="500px" height="auto" />
          <div className="boundingBox" style={{top:this.props.boundingBox.topRow,
            right: this.props.boundingBox.rightCol,
            bottom: this.props.boundingBox.bottomRow,
            left: this.props.boundingBox.leftCol}}></div>
        </div>

      </div>
    )
  }
}

export default FaceRecognition;
