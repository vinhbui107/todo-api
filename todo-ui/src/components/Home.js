import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PostForm from "./PostForm";
import AllTodo from "./AllTodo";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout () {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  getInfo() {
    const access_token = localStorage.getItem("access_token");
    const my_headers = {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios({
      method: "GET",
      url: "http://localhost:8000/api/auth/user",
      headers: my_headers,
    })
      .then((response) => {
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("name", response.data.user.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    this.getInfo();
    const userName = localStorage.getItem("name");
    if (localStorage.getItem("access_token") === null) {
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }
    return (
      <div>
        <h4 className="text-right">Hi {userName}</h4>
        <button className="btn btn-warning btn-sm" onClick={this.logout}>Logout</button>
        <h2 className="text-center">Your Todo List</h2>
        <AllTodo />
        <PostForm />
      </div>
    );
  }
}
export default Home;
