import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            password_confirmation: ""
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        const user = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        console.log(user);

        axios
            .post("http://localhost:8000/api/auth/signup", {
                email: user.email,
                name: user.name,
                password: user.password,
                password_confirmation: user.password_confirmation
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        if (this.state.redirectToReferrer) return <Redirect to={"/login"} />;
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Your name</label>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="form-control"
                            id="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirmation">
                            Password Confirmation
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password_confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
export default Signup;
