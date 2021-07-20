import React, { useEffect, useState } from 'react'
import './MapContainer.css'
import {Character} from '../../components/'
import { ChatContainer } from '..'

const MapContainer = () =>  {
    return (
        <div className='MapContainer'>
            <div className="Map">
                <Character myCharacter='mine'></Character>
                <ChatContainer></ChatContainer>
            </div>
        </div>
    )
}

export default MapContainer