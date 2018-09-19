import React,{Component} from "react";

class Navigation extends Component{

  render(){
      const {isSignedIn} = this.props;
      if(isSignedIn){
        return(
          <nav style={{display:"flex", justifyContent:"flex-end", }}>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => this.props.onRouteChangeFunc("signin")}> Sign Out </p>
          </nav>
        );
      }else{
        return(
          <nav style={{display:"flex", justifyContent:"flex-end", }}>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => this.props.onRouteChangeFunc("signin")}> Sign In </p>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => this.props.onRouteChangeFunc("register")}> Register </p>
          </nav>

        );
      }


  }
}

export default Navigation;
