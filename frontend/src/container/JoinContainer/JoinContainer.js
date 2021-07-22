import React, { useEffect, useState } from 'react'
import './JoinContainer.css'
import { Container, List, Input } from 'semantic-ui-react'
import axios from 'axios'
import { api_server } from '../../configs/configs'

const JoinContainer = () => {
    const [ListItems, setListItems] = useState([ ])
    
    const renderListItems = () => {
        return ListItems.map(( {roomId, name, description},idx ) => (
            <List.Item>
            <List.Content>
                {/* <List.Header as='a' href={`/map/${name}/${roomId}`} >{`${name}/${roomId}`}</List.Header> */}
                <List.Header as='a' href={`/map/${name}/${roomId}`} >{`${name}`}</List.Header>
                <List.Description as='a'>{description}</List.Description>
            </List.Content>
            </List.Item>
        ))
    }

    useEffect(() => {
        axios.get(`${api_server}/api/chat/`)
        .then(res => {
            console.log(res.data)
            let list = new Array()
            res.data.map((value, idx) => {
                list[idx] = {roomId : value.roomId, name : value.name, description : value.description}
            })
            setListItems(list)
        })
    },[])

    return (
        <div className='JoinContainer'>
            <div className='SearchResult'>
                <List divided relaxed style={{height:'100%'}}>
                    {renderListItems()}
                </List>
            </div>
        </div>
    )
}

export default JoinContainer