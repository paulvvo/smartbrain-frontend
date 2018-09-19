import React, { Component } from 'react';
import Navigation from "../components/Navigation/Navigation"
import "./App.css";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import Particles from 'react-particles-js';

import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Signin from "../components/Signin/Signin";
import Register from "../components/Register/Register";

// const Clarifai = require('clarifai');



const initialState = {
  input:"",
  imageUrl:"",
  boundingBox: {},
  route: "signin",
  isSignedIn: false,
  user:{
    id: "",
    name: "",
    email: "",
    entries: 0,
    joinedDate: ""
  }
};


class App extends Component {
  constructor(){
    super();
    this.state=initialState;

  }

  // componentDidMount(){
  //   fetch("http://localhost:3001")
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  // }

  loadUser = (loadingUser) =>{
    //console.log(loadingUser);
    this.setState({user:{
      id: loadingUser.id,
      name: loadingUser.name,
      email: loadingUser.email,
      entries: loadingUser.entries,
      joinedDate: new Date()
    }});

  }

  calculateBoundingBox = (data) =>{

    const boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("faceRecogImage");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    //calculations make sense now, since you made the div an absolute
    //position can be moved, calculation is needed for right and bottom
    //because when you do right: #px or bottom #px, you move from that direction
    return({
      leftCol: imageWidth * boundingBox.left_col,
      rightCol: imageWidth - (imageWidth * boundingBox.right_col),
      topRow: imageHeight * boundingBox.top_row,
      bottomRow: imageHeight - (imageHeight * boundingBox.bottom_row)
    });
    // console.log(imageHeight, imageWidth);
    // console.log(boundingBox);
  }

  displayBoundingBox = (box) =>{
    this.setState({boundingBox:box})
    console.log(box);
  }

  onInputChangeFunc = (event)=>{
    this.setState({input:event.target.value});
    //console.log(event.target.value);
  }

  onButtonSubmitFunc = () =>{
    this.setState({imageUrl:this.state.input});

    // fetch("http://localhost:3001/imageurl",{
    fetch("https://blooming-depths-90740.herokuapp.com/imageurl",{
      method:"post",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        imageUrl: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if(response){
        // fetch("http://localhost:3001/image",{
        fetch("https://blooming-depths-90740.herokuapp.com/image",{
          method:"put",
          headers:{"Content-Type" : "application/json"},
          body:JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}));
        })
        .catch(console.log);
      }
      this.displayBoundingBox(this.calculateBoundingBox(response))
    })
    .catch(err => console.log(err));

    //first parameter is the model id
    //can't use this.state.imageUrl in the second parameter because the setstate that happens above
    //isn't ready to put it in simple terms, set state happens in batches for efficenency, so if
    //when you put the second paramet as imageUrl, the setstate above probably didn't happen yet
    //imageUrl as the second parameter will only work when you push the button twice cause the setState
    //from the first button push is what set the image Url

    // can't pass the response back to another function when writing it this way for some reason
    // app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input).then(
    //   function(response) {
    //     console.log(response);
    //     console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    //   },
    //   function(err) {
    //     // there was an error
    //   }
    // );

    // console.log("click");
    //console.log(this.state.input);
  }

  onRouteChange = (route) =>{


    route==="home"
    ? this.setState({isSignedIn: true})
    : this.setState(initialState);
    this.setState({route: route})
  }
  render() {
    //destructuring to make app cleaner, i just want to use it right now
    //const { isSignedIn, route, imageUrl, boundingBox } = this.state;
    return (
    <div className="App">
      <Particles className="particles"/>
      <Navigation onRouteChangeFunc={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
      {
        this.state.route === "home" ?
        <div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChangeFunc={this.onInputChangeFunc} onButtonSubmitFunc={this.onButtonSubmitFunc}/>
          <FaceRecognition boundingBox={this.state.boundingBox} imageUrl={this.state.imageUrl}/>
        </div>
        :(
          this.state.route==="signin"
          ?<Signin loadUser={this.loadUser} onRouteChangeFunc={this.onRouteChange} />
          :<Register loadUser={this.loadUser} onRouteChangeFunc={this.onRouteChange} />
        )
      }
    </div>
    );
  }




}

export default App;
