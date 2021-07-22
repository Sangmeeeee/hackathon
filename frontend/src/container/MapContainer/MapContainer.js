import React, { useCallback, useEffect, useState } from 'react'
import './MapContainer.css'
import {Character} from '../../components/'
import { ChatContainer } from '..'
import socketio from 'socket.io-client'
import { socket_server } from '../../configs/configs'
import { Button } from 'semantic-ui-react'
import SocketContext from '../../service/SocketProvider'

const pc_config = {
    iceServers : [
        {
            urls : 'stun:stun.l.google.com:19302'
        }
    ]
}

const MapContainer = (props) =>  {
    const [character, setCharacter] = useState({})
    const socket = socketio.connect(socket_server)
    let roomId = props.match.params.roomId 
    
    const renderCharater = () => {
        if(Object.keys(character).length !== 0){
        return character.map(value => {
            let ID = Object.keys(value)
            let x = value[ID].x
            let y = value[ID].y   
            // console.log(`${ID} : ${x} , ${y}`)
            if(ID != window.sessionStorage.getItem('ID'))
            return (
              <Character
                roomId={roomId}
                characterID={ID} 
                x={value[ID].x}
                y={value[ID].y}
                onClick={() => alert(`${ID}`)} 
              />
           )
        })
        }
    }

    useEffect(() => {
    socket.emit('ENTER',{ID : window.sessionStorage.getItem('ID'), roomId : props.match.params.roomId})

    socket.on('HELLO',(data) => {
        let keys = Object.keys(data)
        let result = keys.map((value, idx) => {
            let member = new Object
            member[keys[idx]] = data[value]
            return member
        })
        setCharacter(character => [...result])
    })
    
    socket.on('SETLOCATION',(data) => {
        let keys = Object.keys(data)
        let results = keys.map((value, idx) => {
            let member = new Object
            member[keys[idx]] = data[value]
            return member
        })
        // console.log('get setLocation msg', results)
        setCharacter(character => [...results])
    })
    
    return() => {
        console.log(socket)
    }
},[])

    return (
        <div className='MapContainer'>
            <div className="Map" >
                <Character  
                    socket={socket}
                    myCharacter='my'
                    characterID = {window.sessionStorage.getItem('ID')}
                    x={0}
                    y ={0}
                    roomId={roomId}
                />
                {renderCharater()}
                <ChatContainer socket={socket} roomId={props.match.params.roomId} ></ChatContainer>
            </div>
        </div>
    )
}

export default MapContainer