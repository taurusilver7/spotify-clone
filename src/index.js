import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { DataLayerProvider } from "./context/DataLayerProvider";
import reducer, { initialState } from "./context/reducer";

ReactDOM.render(
  <DataLayerProvider intialState={initialState} reducer={reducer}>
    <App />
  </DataLayerProvider>,
  document.getElementById("root")
);
