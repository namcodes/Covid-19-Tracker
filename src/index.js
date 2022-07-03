import React from "react";
import ReactDom from "react-dom/client";

import App from "./App";
import './styles/App.scss';

const container = ReactDom.createRoot(document.getElementById("container"));

container.render(
    <App />
);