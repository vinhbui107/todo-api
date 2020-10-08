import React, { Component, useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import SearchForm from "./SearchForm";

class AllTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: "",
    };
  }

  callbackHandlerFunction = (keyword) => {
    this.setState({
      filter: keyword,
    });
  };

  componentDidMount() {
    const access_token = localStorage.getItem("access_token");
    const my_headers = {
      Authorization: "Bearer " + access_token,
      Accept: "application/jso  n",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios({
      method: "GET",
      url: "http://localhost:8000/api/todos",
      headers: my_headers,
    })
      .then((response) => {
        this.setState({ todos: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onClickDelete(id) {
    const access_token = localStorage.getItem("access_token");
    const my_headers = {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    axios
      .delete("http://localhost:8000/api/todos/" + id, { headers: my_headers })
      .then((response) => {
        alert("Delete todo successfully.");
        window.location.reload();
        console.log(response);
      })
      .catch(function (error) {
        alert("something wrong!!!!!!");
        console.log(error);
      });
  }

  renderTable = () => {
    if (this.state.filter === null) {
      return this.state.todos.map((todo, index) => {
        return (
          <tr key="index">
            <td>{todo.id}</td>
            <td>{todo.body}</td>
            <td>
              <button
                type="button"
                onClick={this.onClickDelete.bind(this, todo.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return this.state.todos
        .filter((todo) => todo.body.include(this.state.filter))
        .map((todo, index) => {
          return (
            <tr key="index">
              <td>{todo.id}</td>
              <td>{todo.body}</td>
              <td>
                <button
                  type="button"
                  onClick={this.onClickDelete.bind(this, todo.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        });
    }
  };

  render() {
    if (isEmpty(this.state.todos)) {
      return <h3>Create your first todo.</h3>;
    }
    return (
      <>
        <SearchForm handleClickParent={this.callbackHandlerFunction} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Content</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </>
    );
  }
}
export default AllTodo;
