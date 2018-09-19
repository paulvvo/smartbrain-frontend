import React,{Component} from "react";
import "./ImageLinkForm.css";
class ImageLinkForm extends Component{
  render(){
    return(
      <div>
        <p className="f3 center">{`Magic detection application, give it a try`} </p>
        <div className="center">
          <div className="pa4 br3 shadow-5 form center">
            <input className="f4 pa2 w-70 center" type="text" placeholder="image url" onChange={this.props.onInputChangeFunc}/>
            <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={this.props.onButtonSubmitFunc}>Detect</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageLinkForm;
