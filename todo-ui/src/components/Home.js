import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PostForm from "./PostForm";
import AllTodo from "./AllTodo";
import SearchForm from "./SearchForm";
import axios from "axios";

class Home extends Component {
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    this.getInfo();
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
        <h3 className="text-center">Your Todo List</h3>
        <AllTodo />
        <PostForm />
      </div>
    );
  }
}
export default Home;
