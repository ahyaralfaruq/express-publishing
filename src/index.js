import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";

const el = document.querySelector("#root");
const root = ReactDOM.createRoot(el);

root.render(<App />, root);
// ReactDOM.render(<App />, document.getElementById("root"));
