import React from 'react';
import * as ReactDOM from "react-dom";
import {App} from "./App";
import {store} from "./store/store";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import './main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);