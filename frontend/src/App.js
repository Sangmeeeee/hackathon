
import './App.css';
import { Route } from 'react-router-dom'
import {MapContainer} from './container'
import {Menus} from './components'
import { MainContainer } from './container';
import { Container, Divider, Button, Icon, Menu } from 'semantic-ui-react'


function App() {
  return (
    <div className="App">
      <Menus></Menus>
      <MainContainer></MainContainer>
    </div>
  )
}

export default App;
