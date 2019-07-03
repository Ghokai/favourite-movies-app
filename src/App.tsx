import React from "react";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./App.css";
import Main from "./components/Main";
import configureStore from "./store";

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
