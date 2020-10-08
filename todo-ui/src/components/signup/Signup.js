import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    };
  }

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  onPasswordConfirmationChange = (e) => {
    this.setState({
      password_confirmation: e.target.value,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    if (user.password === user.password_confirmation) {
      axios
        .post("http://127.0.0.1:8000/api/auth/signup", {
          email: user.email,
          name: user.name,
          password: user.password,
          password_confirmation: user.password_confirmation,
        })
        .then((response) => {
          alert("Create new user successfully.");
          this.props.history.push("/");
        })
        .catch(function (error) {
          alert("something wrong!!!!!!");
          console.log(error);
        });
    } else {
      alert("Password not match");
    }
  }

  render() {
    if (localStorage.getItem("access_token") !== null) {
      this.props.history.push("/");
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={this.onEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
              className="form-control"
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              className="form-control"
              id="password_confirmation"
              value={this.state.password_confirmation}
              onChange={this.onPasswordConfirmationChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="text-black ml-5">
            I'm already member
          </Link>
        </form>
      </div>
    );
  }
}
export default Signup;
