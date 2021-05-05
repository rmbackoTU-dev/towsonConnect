import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.scss";


export default class Login extends Component {
  state = {
    userNameOremail: "",
    password: "",
    user_id: ''
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  

  submit = (event) => {
    event.preventDefault();

    const payload = {
      userNameOrEmail: this.state.userNameOrEmail,
      password: this.state.password,
    }; 
    console.log("Submitting: "+JSON.stringify(payload));

    //https://limitless-mountain-55127.herokuapp.com/users/login
    axios({
      url: "http://localhost:8080/users/login",
      method: "POST",
      data: payload
    })
      .then((res) => {
        console.log("Success");
        console.log(res);

        //sets user_id for transfer between components
        this.setState({user_id: res.data.user})

        if(res.data.status === "success") {
            alert("Success")
            //this.props.history.push("/content")
            const location = {
              pathname: '/content',
              state: {user_id: this.state.user_id}
            }

            this.props.history.push(location)
        } else {
            if(res.data.errors.userName.length > 0) {
                alert("UserName or Email not found. Please consider Signup.")
            } else if(res.data.errors.email.length) {
                alert("UserName or Email not found. Please consider Signup.")
            } else if(res.data.errors.password.length) {
                alert("Password is incorrect. Please try again.")
            }
        }
      })
      .catch((err) => {
        console.log("Internal server error");
        alert("Internal Server Error. Please try again.");
        console.log(err);
      });

  };
  render() {
    console.log("state: ", this.state);
    return (
      <div className='login_wrapper'>
        <header className="login_header">
          <div className="form_box">
            <div className="button_box">
              <Link to="/register" className="btn" id="login" role="button">
                Register
              </Link>
              <a href="#" id="register" className="btn btn-primary">
                Login
              </a>
            </div>

            <div class="icon_img">
              <img src={process.env.PUBLIC_URL+"/towson-branded-logos/TowsonU_ConnectLogo-pos.png"} alt="" />
            </div>

            <form onSubmit={this.submit}>
              <div className="form-group">
                <input
                  type="text"
                  name="userNameOrEmail"
                  value={this.state.userNameOrEmail}
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email Or Username"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
            <span>
              You are agreed with our <a href="#">Terms & Conditions </a>and
              <a href="#"> Privacy Policies</a>
            </span>
          </div>
        </header>
      </div>
    );
  }
}
