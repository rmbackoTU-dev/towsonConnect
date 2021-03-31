import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../login.css";


export default class Login extends Component {
  state = {
    userNameOremail: "",
    password: "",
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
      userNameOremail: this.state.userNameOremail,
      password: this.state.password,
    }; 

    axios({
      url: "/authentication/login",
      method: "POST",
      data: payload
    })
      .then((res) => {

        console.log("Success");
        console.log(res);

        if(res.data.status === "success") {
            alert("Success")
            this.props.history.push("/success")
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
      <div>
        <header className="header">
          <div className="form_box">
            <div className="button_box">
              <Link to="/register" class="btn" id="login" role="button">
                Register
              </Link>
              <a href="#" id="register" class="btn btn-warning">
                Login
              </a>
            </div>

            <div class="icon_img">
              <img src="towsonu-logo.png" alt="" />
            </div>

            <form onSubmit={this.submit}>
              <div className="form-group">
                <input
                  type="text"
                  name="userNameOremail"
                  value={this.state.userNameOremail}
                  onChange={this.handleChange}
                  class="form-control"
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
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button class="btn btn-warning">Submit</button>
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
