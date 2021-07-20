import React from 'react'
import { Route } from 'react-router'
import { Container } from "semantic-ui-react"
import { MapContainer,CreateContainer,JoinContainer, MyPageContainer } from ".."

const MainContainer = () => {
    return(
        <div className='Main' style={{border:'1px solid black', height:'90%'}}>
        <Container textAlign='center'>
          <Route exact path="/" component={() => {return (<div>this is main pages</div>)}}/>
          <Route exact path="/:id/Map" component={MapContainer}/>
          <Route exact path="/:id/Create" component={CreateContainer}/>
          <Route exact path="/:id/MyPage" component={MyPageContainer}/>
          <Route exact path="/:id/Join" component={JoinContainer}/>
        </Container>
      </div>
    )
}

export default MainContainer