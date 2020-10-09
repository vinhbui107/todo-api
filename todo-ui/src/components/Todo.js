import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Dialog } from "react-bootstrap-easy-dialog";

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
            <PromptWithInputProps />

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

function PromptWithInputProps() {
    return (
        <div>
        <Dialog>
            {dialog => {
            async function handleClick() {
                const inputValue = await dialog.prompt(
                "Change your content of task.",
                {
                    title: "Select a smart phone",
                    inputProps: {
                        defaultValue: "",
                    }
                }
                );
                console.log(inputValue);
            }
            return <Button onClick={handleClick}>Edit</Button>;
            }}
        </Dialog>
        </div>
    );
    }
