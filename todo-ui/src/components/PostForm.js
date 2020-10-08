import React, { Component } from "react";
import axios from "axios";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
  }

  onBodyChange = (e) => {
    this.setState({
      body: e.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    const my_headers = {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const todo = {
      body: this.state.body,
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post(
        "http://localhost:8000/api/todos",
        {
          body: todo.body,
          user_id: todo.user_id,
        },
        { headers: my_headers }
      )
      .then((response) => {
        alert("Create new todo successfully.");
        window.location.reload();
        console.log(response);
      })
      .catch(function (error) {
        alert("something wrong!!!!!!");
        console.log(error);
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={this.state.body}
            onChange={this.onBodyChange}
            id="new-todo"
            placeholder="New Todo"
          />
          <button type="submit" className="btn btn-dark mt-3">
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default PostForm;
