import React, { Component, useState } from 'react'
import { Menu } from 'semantic-ui-react'


const Menus = () => {
    const [activeItem, setActiveItem] = useState('Logout')

    const handleItemClick = (e, {name}) => {
        setActiveItem(name)
        name === 'Logout' ? window.location.href='/' : window.location.href = `/${window.sessionStorage.getItem('ID')}/${name}`
    }

    return(
        <div className='Menus' style={{height:'10%',width:'100%'}}>
          <a href={`/${window.sessionStorage.getItem('ID')}`}><img className='logo' src='/img/shadow.png' style={{width:'10%',height:'100%', position:'relative', left:'0'}}   ></img></a>
          <Menu style={{position:'absolute', right:'10%',width:'fix-content', right:'0', top:'0'}}>
          <Menu.Item
            name='Join'
            active={activeItem === 'Join'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Create'
            active={activeItem === 'Create'}
            onClick={handleItemClick}
          />
          {/* <Menu.Item
            name='MyPage'
            active={activeItem === 'MyPage'}
            onClick={handleItemClick}
          /> */}
          <Menu.Item
            name='Logout'
            active={activeItem === 'Logout'}
            onClick={handleItemClick}
          />
        </Menu>
      </div>
    )
}

export default Menus