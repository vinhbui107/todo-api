import React, { Component } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import SearchForm from "./SearchForm";
import Todo from "./Todo"

class AllTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      searchKey: "",
      searchResult: [],
      temp: []
    };
  }

  componentDidMount() {
    const access_token = localStorage.getItem("access_token");
    const my_headers = {
      Authorization: "Bearer " + access_token,
      Accept: "application/json",
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

  render() {
    if(this.state.searchKey.length > 0) {
      this.state.temp = this.state.searchResult;
    } else {
      this.state.temp = this.state.todos;
    }

    if (isEmpty(this.state.todos)) {
      return <h3>Create your first todo.</h3>;
    }
    return (
      <>
        <SearchForm todos={this.state.todos} searchKey={this.state.searchKey} searchResult={this.state.searchResult}/>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Content</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.temp.map((todo, index) => {
              return (
                <tr key={index}>
                  <Todo todo={todo} index={index} />
                </tr>
              )
            })
          }</tbody>
        </table>
      </>
    );
  }
}
export default AllTodo;
