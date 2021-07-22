
import './App.css';
import { Route, Router } from 'react-router-dom'
import {MapContainer} from './container'
import {Menus} from './components'
import { MainContainer, LoginCotainer, SignupContainer } from './container';
import { Container, Divider, Button, Icon, Menu } from 'semantic-ui-react'
import { useContext, useState } from 'react';
import SocketContext from './service/SocketProvider';


function App() {
  const socket = useContext(SocketContext)
  console.log(socket)
  return (
    <div className="App">
      <Route exact path="/" component={LoginCotainer}/>
      <Route exact path="/Signup" component={SignupContainer}/>
      <Menus></Menus>
        <MainContainer></MainContainer>
    </div>
  )
}

export default App;
