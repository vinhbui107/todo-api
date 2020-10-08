import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
    // String token = store.getState().session.token;
    // axios.defaults.headers.common["Authorization"] = token;
    render() {
        return (
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <div class="form-group form-check">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        id="remember_me"
                    />
                    <label class="form-check-label" for="remember_me">
                        Remember Me
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        );
    }
}
export default Login;
