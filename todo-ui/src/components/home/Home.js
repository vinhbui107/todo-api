import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";

class Home extends Component {
  render() {
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
        <TodoList />
        <NewTodo />
      </div>
    );
  }
}
export default Home;
