import React, { Component } from "react";
import { Link } from "react-router-dom";
import CourseSelect from "../course-list/CourseSelect";
import axios from "axios";
import "./register.scss";

class Register extends Component {
  
  constructor(props)
  {
    super(props);
    this.state=
    {
      userName: "",
      email: "",
      password: "",
      userType: "",
      userRegistered:false,
      userId:""
    }
    this.courseRegister=this.courseRegister.bind(this);
  }
  
  

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
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType
    };
    console.log("Submitting: "+JSON.stringify(payload));


    //https://limitless-mountain-55127.herokuapp.com/users/signup
    axios({
      url: "http://localhost:8080/users/signup",
      method: "POST",
      data: payload,
      })
      .then((res) => {
        console.log("Success");
        console.log(res);
        const registeredUserData=res.data.userId;
        if (res.data.status === "success") {
          alert("Success");
          this.setState({userId:registeredUserData,
            userRegistered:true });
        } else {
          if (res.data.errors.userName.length > 0) {
            alert(res.data.errors.userName);
          } else if (res.data.errors.email.length) {
            alert(res.data.errors.email);
          } else if (res.data.errors.password.length) {
            alert(res.data.errors.password);
          } else if (res.data.errors.userType.length) {
             alert(res.data.errors.userType) 
          }
      }}).catch((err) => {
        console.log("Internal server error");
        alert("Internal Server Error. Please try again.");
        console.log(err);
      });
  };

  courseRegister(result)
  {
    if(result)
    {
      const contentpage=
      {
        pathname: "/content",
        state:{
          userId:this.state.userId,
          userType:this.state.userType
        }
      }
      this.props.history.push(contentpage);
    }
    else
    {
      console.log("Course Registration Failure");
    }
  }

  render() {
    console.log("state: ", this.state);
    const userRegister=this.state.userRegistered;
    if(!userRegister)
    {
      return (
        <div className="register_wrapper">
          <header className="register_header">
            <div className="form_box">
              <div className="button_box">
                <a href="#" id="register" className="btn btn-primary">
                  Register
                </a>
                <Link to="/login" className="btn" id="login" role="button">
                  Login
                </Link>
              </div>

              <div className="icon_img">
                <img src={process.env.PUBLIC_URL+"/towson-branded-logos/TowsonU_ConnectLogo-pos.png"} alt="" />
              </div>

              <form onSubmit={this.submit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    className="form-control form-warning"
                    id="exampleInputEmail1"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="example@gmail.com"
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
                <a href="#">Forgot Password?</a>
                {<div className="form-group">
                  <div className="btn-group">
                    <select
                      className="form-control btn-shadow"
                      name="userType"
                      onChange={this.handleChange}
                      value={this.state.value}
                    >
                      <option>Signup as</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                    </select>
                  </div>
                </div> }
                <button className="btn btn-primary btn-block">Submit</button>
              </form>
              <br />
              <span>
                You are agreed with our <a href="#">Terms & Conditions </a>and
                <a href="#"> Privacy Policies</a>
              </span>
            </div>
          </header>
        </div>
      );
    }else
    {
      return(
      <div className="register_wrapper">
        <CourseSelect userId={this.state.userId}
        onFormSubmit={this.courseRegister}/>
      </div>
      );
    }
  }
}

export default Register;
