import React, {Component} from "react";
import axios from "axios";
import {isEmpty, isNull} from "lodash";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { "id": 1, "body": "dafadf"},
                { "id": 2, "body": "dafadf"},
                { "id": 3, "body": "dafadf"}
            ]
        };
    }

    componentDidMount() {
        const access_token = localStorage.getItem("access_token");
        const my_headers = {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        axios({
            method: "GET",
            url: "http://localhost:8000/api/todos",
            headers: my_headers
            })
            .then(response => {
                alert(response["data"][0]);
               this.state.todos = response.data;
               console.log()
            })
            .catch(function (error) {
            console.log(error);
        });
    }

    renderTable = () => {
        return this.state.todos.map((todo, index) => {
            return (
                <tr key="index">
                    <td>{todo.id}</td>
                    <td>{todo.body}</td>
                </tr>
            )
        })
    }

    render() {
        if (isEmpty(this.state.todos)) {
            return <h3>Create your first todo.</h3>;
        }
        return (
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>content</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTable()}
                </tbody>
            </table>
        );
    }
}
export default TodoList;
