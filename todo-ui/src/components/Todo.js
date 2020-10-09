import React, { Component } from "react";
import axios from "axios";

class Todo extends Component {

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
        })
        .catch(function (error) {
            alert("something wrong!!!!!!");
            console.log(error);
        });
    }

    onClickEdit() {

    }

  render() {
    return (
        <>
            <td>{this.props.todo.id}</td>
            <td>{this.props.todo.body}</td>
            <td>
            <button
                type="button"
                className="btn btn-outline-primary btn-sm mr-3"
            >
                Edit
            </button>
            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={this.onClickDelete.bind(this, this.props.todo.id)}
            >
                Delete
            </button>
            </td>
        </>
    );
  }
}
export default Todo;
