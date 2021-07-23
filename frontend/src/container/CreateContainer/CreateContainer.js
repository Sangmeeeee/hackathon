import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CreateContainer.css'
import { Form, Checkbox, Button } from 'semantic-ui-react'
import { api_server } from '../../configs/configs'

/*

본인 소유의 방이 있으면 제작 불가능

*/

// axios.defaults.withCredentials = true

const CreateContainer = () => {
    const [hasRoom, setHasRoom] = useState(false)
    const [roonName, setRoomName] = useState(null)
    const [roomDescription, setRoomDescription] = useState(null)

    const handleChangeRoomName = (e) => {
        setRoomName(e.target.value)
    }

    const handleChangeRoomDescription = (e) => {
        setRoomDescription(e.target.value)
    }


    const handleSubmit = () => {
        axios.post(`${api_server}/api/chat/room/new`,{
            name : roonName,
            description : roomDescription
        }).then(res => {
            console.log(res.data.status)
            if(res.data.status == "success") window.location.href = `/${window.sessionStorage.getItem('ID')}/Join`
            else alert('방 생성에 실패했습니다!')
        })
    }


    if (hasRoom)
        return (
            <div className='CreateContainer'>you have room</div>
        )
    else
        return (
            <div className='CreateContainer'>
                <div className='CreateForm'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Room Name</label>
                            <input onChange={handleChangeRoomName.bind(this)} placeholder='Room Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Room Description</label>
                            <input onChange={handleChangeRoomDescription.bind(this)} placeholder='Room Description' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </div>
        )
}

export default CreateContainer