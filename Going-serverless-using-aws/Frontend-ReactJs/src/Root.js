import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./utils/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <App />
            <ToastContainer hideProgressBar={true} newestOnTop={false} />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default Root;
