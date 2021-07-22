import React, { useEffect, useState } from 'react'
import './Character.css'

const Character = (props) => {

    let frame = 0
    let x = props.x
    let y = props.y
    let characterID = props.characterID
    let roomId = props.roomId
    let limitX = 1000
    let limitY = 800

    if(props.myCharacter !== 'my'){
        console.log(characterID)
    }

    useEffect(() => {
        console.log(props)
        if(props.socket!=undefined)
            console.log(props.socket)
        if(props.myCharacter === 'my')
            console.log(document.getElementsByClassName('Character')[0])
            
        window.addEventListener('keypress',(e) => {
            // document.getElementsByClassName('Character')[0].addEventListener('keypress', (e) => {
            switch(e.code){
                case 'KeyW' :
                    y - 10 > 0 ? y -= 10 : y = y
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y})
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_up${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.top = y + 'px'
                    break;
                case 'KeyS' :
                    y + 10 < limitY ? y += 10 : y = y
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y})
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_down${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.top = y + 'px'
                    break;
                case 'KeyA' :
                    x - 10 > 0 ? x -= 10 : x = x
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y})
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_left${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.left = x + 'px'
                    break;
                case 'KeyD' :
                    x + 10 < limitX ? x += 10 : x = x
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y})
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_right${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.left = x + 'px'
                    break;
            }
        })
    
        window.addEventListener('keyup',(e) => {
        // document.getElementsByClassName('Character')[0].addEventListener('keyup', (e) => {
            switch(e.code){
                case 'KeyW' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_up1.png'
                    frame = 0
                    break;
                case 'KeyS' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_down1.png'
                    frame = 0
                    break;
                case 'KeyA' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_left1.png'
                    frame = 0
                    break;
                case 'KeyD' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_right1.png'
                    frame = 0
                    break;
            }
        })
    },[])


    return(
        <div className='Character' style={{top:y, left:x}} onClick={props.onClick}>
            <p>{characterID}</p>
            <img src='/img/male/male_walk_down1.png' height='32' width='32'></img>
            <img src='/img/shadow.png' height='32' width='32' style={{position:'relative', display:'block', top:'-20px'}}></img>
        </div>
    )
}

export default Character