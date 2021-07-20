import React, { useEffect, useState } from 'react'
import './JoinContainer.css'
import { Container, List, Input } from 'semantic-ui-react'

const JoinContainer = () => {
    const [ListItems,setListItems] = useState(null)

    const ListItem = (Header, Description) => {
        return(
            <List.Item>
            <List.Content>
                <List.Header as='a'>{Header}</List.Header>
                <List.Description as='a'>{Description}</List.Description>
            </List.Content>
            </List.Item>
        )
    }

    useEffect(() => {
        setListItems([
            ListItem('1','1'),
            ListItem('2','2'),
            ListItem('3','3'),
        ])
        console.log(ListItems)
    })


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