import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";
import App from "./App";

//config global for axios
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";

ReactDOM.render(
  <BrowserRouter>
    <App /> 
  </BrowserRouter>,
  document.getElementById("app")
);
