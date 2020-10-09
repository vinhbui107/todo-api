import React, { Component } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import SearchForm from "./SearchForm";

class AllTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      searchKey: "",
      searchResult: []
    };
  }

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
      if(this.state.searchKey.length <= 0) {
        return this.state.todos.map((todo, index) => {
        return (
          <tr key={index}>
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
        return this.state.searchResult.map((todo, index) => {
        return (
          <tr key={index}>
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

  handleSearch = (searchKey) => {
    let searchResult = this.state.todos;
    let newArray = [];
    if(searchKey.length <= 0) {
        newArray = searchResult;
    } else {
        searchKey.toLowerCase();
        for(let todo of searchResult) {
            if(todo.body.includes(searchKey)) {
                newArray.push(todo);
            }
        }
    }
    this.setState({
        searchResult : newArray,
        searchKey: searchKey
    });
  }

  render() {
    if (isEmpty(this.state.todos)) {
      return <h3>Create your first todo.</h3>;
    }
    return (
      <>
        <SearchForm valueSearch={this.state.searchKey} handleSearch={this.handleSearch}/>
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
