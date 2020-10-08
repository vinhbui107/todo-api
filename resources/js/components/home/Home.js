import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Home extends Component {
    render() {
        if (localStorage.getItem("access_token") === null) {
            return (
                <Redirect
                    to={{
                        pathname: "/login"
                    }}
                />
            );
        }
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}
export default Home;
