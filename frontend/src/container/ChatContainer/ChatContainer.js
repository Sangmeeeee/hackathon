import React, { useCallback, useContext, useEffect, useState } from 'react'
import './ChatContainer.css'
import { Form, Button } from 'semantic-ui-react'
import { socket_server } from '../../configs/configs'
import SocketContext from '../../service/SocketProvider'

const ChatContainer = (props) => {
    // const [chat, setChat] = useState([])
    const chat = props.chat
    const socket = props.socket
    // socket.on('message',(data) => {
    //     console.log(data)
    //     setChat(chat => ([...chat,{name: data.ID, msg : data.message}]))
    // })
    // console.log(socket)

    const renderChat = () => {
        return chat.map(( { name, msg }, idx) => (
            <div key={idx}>
                <h5>{`${name} : ${msg}`}</h5>
            </div>
        ))
    }

    // useEffect(() => {
    //     // socket.on('message',(data) => {
    //     //     console.log(data)
    //     //     setChat(chat => ([...chat,{name: data.ID, msg : data.message}]))
    //     // })
    // })

    const handleSubmit = () => {
        socket.emit('CHAT', {ID : window.sessionStorage.getItem('ID'), roomId : props.roomId, message : document.getElementsByClassName('message')[0].value})
    }


    return (
        <div className='ChatContainer'>
            <div className='Chat'>
                {renderChat()}
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <input className='message' placeholder='Chat...' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default ChatContainer

/* 
검색 api
로그인 api
회원가입 api

방이 있는지 없는지 api

방 생성 api

*/