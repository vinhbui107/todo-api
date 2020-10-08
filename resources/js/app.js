import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import axios from "axios";

//config global for axios
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.get["Content-Type"] =
    "application/x-www-form-urlencoded";

render(<App />, document.getElementById("app"));
