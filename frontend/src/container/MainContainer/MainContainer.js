import React from 'react'
import { Route } from 'react-router'
import { Container } from "semantic-ui-react"
import { MapContainer } from ".."

const MainContainer = () => {
    return(
        <div className='Main' style={{border:'1px solid black', height:'90%'}}>
        <Container textAlign='center'>
          <Route exact path="/map/:mapCode" component={MapContainer}/>
        </Container>
      </div>
    )
}

export default MainContainer