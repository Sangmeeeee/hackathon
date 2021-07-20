import React, { useState } from 'react'
import './ChatContainer.css'
import { Form, Button } from 'semantic-ui-react'

const ChatContainer = () => {
    const [chat, setChat] = useState([])
    const [message,setmessage] = useState(null)
    const [type, settype] = useState(null)
    const [writer, setwriter] = useState(null)
    const [chatRoomId, setchatRoomId] = useState([])

    const renderChat = () => {
        return chat.map(( { name, msg }, idx) => (
            <div key={idx}>
                <h3>{`${name} : ${msg}`}</h3>
            </div>
        ))
    }

    const handleSubmit = () => {
        setChat([...chat,{name: 'test', msg : document.getElementsByClassName('message')[0].value}])
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