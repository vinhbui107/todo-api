import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember_me: true,
      redirect: false,
    };
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onRememberMeChange = (e) => {
    this.setState({
      remember_me: e.target.value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      remember_me: this.state.remember_me,
    };
    console.log(user);

    axios
      .post("http://localhost:8000/api/auth/login", {
        email: user.email,
        password: user.password,
        remember_me: user.remember_me,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        this.props.history.push("/");
      })
      .catch((error) => {
        alert("Password or Email not correct!!!");
      });
  }

  render() {
    if (localStorage.getItem("access_token") !== null) {
      this.props.history.push("/");
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="remember_me"
            value={this.state.remember_me}
            onChange={this.onRememberMeChange}
          />
          <label className="form-check-label" htmlFor="remember_me">
            Remember Me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/signup" className="text-black ml-5">
          Create new account.
        </Link>
      </form>
    );
  }
}
export default Login;
