import React, { useEffect, useState } from 'react'
import './MapContainer.css'
import {Character} from '../../components/'

const MapContainer = () =>  {
    return (
        <div className="MapContainer">
            <Character myCharacter='mine'></Character>
        </div>
    )
}

export default MapContainer