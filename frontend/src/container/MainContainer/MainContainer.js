import React, { useContext } from 'react'
import { Route } from 'react-router'
import { Container } from "semantic-ui-react"
import { MapContainer,CreateContainer,JoinContainer, MyPageContainer } from ".."
import socketio from 'socket.io-client'
import { socket_server } from '../../configs/configs'
import SocketContext from '../../service/SocketProvider'


const MainContainer = () => {
    return(
        <div className='Main'>
        <Container textAlign='center' style={{height:'100%',width:'100%'}}>
          <Route exact path="/:id" component={() => {return (<div>{`hello!! ${window.sessionStorage.getItem('ID')}`}</div>)}}/>
          <Route exact path="/map/:id/:roomId" component={MapContainer}/>
          <Route exact path="/:id/Create" component={CreateContainer}/>
          {/* <Route exact path="/:id/MyPage" component={MyPageContainer}/> */}
          <Route exact path="/:id/Join" component={JoinContainer}/>
        </Container>
      </div>
    )
}

export default MainContainer