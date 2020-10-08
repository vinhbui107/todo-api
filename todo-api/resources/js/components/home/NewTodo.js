import React, { Component } from "react";

class NewTodo extends React.Component {
    state = { term: "" };
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.term === "") return;
        this.props.onFormSubmit(this.state.term);
        this.setState({ term: "" });
    };
    render() {
        return (
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
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

export default NewTodo;
