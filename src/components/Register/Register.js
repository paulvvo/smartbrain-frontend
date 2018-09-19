import React,{Component} from "react";

class Register extends Component{
  constructor(){
    super();
    this.state = {
      name:"",
      email:"",
      password:""
    }
  }
  onNameInputChange = (event) =>{
    // console.log(event.target.value);
    this.setState({name: event.target.value});
  }
  onEmailInputChange = (event) =>{
    // console.log(event.target.value);
    this.setState({email:event.target.value});
  }
  onPasswordInputChange = (event) =>{
    // console.log(event.target.value);
    this.setState({password:event.target.value});
  }
  onSubmitButton=()=>{
    //console.log(this.state);

    fetch("https://blooming-depths-90740.herokuapp.com/register",{
      method:"post",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      console.log(user);
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChangeFunc("home")
      }
    })

  }
  render(){
    return(
      <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameInputChange}/>
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange = {this.onEmailInputChange}/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordInputChange}/>
                </div>
              </fieldset>
              <div className="">
                <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitButton}/>
              </div>

            </div>
          </main>
        </article>
      </div>
    )
  }
}

export default Register;
