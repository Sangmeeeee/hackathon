import React, { useEffect, useState } from 'react'
import './JoinContainer.css'
import { Container, List, Input } from 'semantic-ui-react'
import axios from 'axios'

const JoinContainer = () => {
    const [ListItems,setListItems] = useState(null)

    const ListItem = (ID,roomName, roomDescription) => {
        return(
            <List.Item>
            <List.Content>
                <List.Header as='a' href={`/${ID}/map`} >{`${ID}/${roomName}`}</List.Header>
                <List.Description as='a'>{roomDescription}</List.Description>
            </List.Content>
            </List.Item>
        )
    }

    useEffect(() => {
        // setListItems([
        //     ListItem('ID1','roomName1','roomDescription1'),
        //     ListItem('ID2','roomName2','roomDescription2'),
        //     ListItem('ID3','roomName3','roomDescription3'),
        // ])

        axios.get('http://localhost:8080/api/chat/')
        .then(res => {
            console.log(res.data)
        })
    },[])


    return (
        <div className='JoinContainer'>
            <div className='JoinSearch'>
                <Input placeholder='Search...' />
            </div>
            <div className='SearchResult'>
                <List divided relaxed>
                    {ListItems}
                </List>
            </div>
        </div>
    )
}

export default JoinContainer