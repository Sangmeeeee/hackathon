import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import socketio from 'socket.io-client'
import { socket_server } from './configs/configs';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import SocketContext from './service/SocketProvider';
import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
