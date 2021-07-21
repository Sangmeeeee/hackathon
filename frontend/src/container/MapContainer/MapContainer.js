import React, { useEffect, useState } from 'react'
import './MapContainer.css'
import {Character} from '../../components/'
import { ChatContainer } from '..'
import socketio from 'socket.io-client'
import { socket_server } from '../../configs/configs'
import { Button } from 'semantic-ui-react'

const MapContainer = (props) =>  {
    const [socket, setSocket] = useState(null)
    let webSocket

    useEffect(() => {
        webSocket = socketio.connect('http://localhost:9090/')
        setSocket(webSocket)
        window.sessionStorage.setItem('socket',webSocket)
        
        webSocket.emit('ENTER',{ID : window.sessionStorage.getItem('ID'), roomId : props.match.params.roomId})

        webSocket.on('hello', (data) => {
            console.log(data)
        })
    },[webSocket])


    const handler = () => {
        webSocket.emit('ENTER','asdasd')
    }

    return (
        <div className='MapContainer'>
            <div className="Map">
                <Character  myCharacter='mine'></Character>
                <ChatContainer socket={socket} ></ChatContainer>
                <Button onClick={handler}></Button>
            </div>
        </div>
    )
}

export default MapContainer