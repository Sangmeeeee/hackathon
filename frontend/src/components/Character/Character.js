import React, { useEffect, useState } from 'react'
import './Character.css'

const Character = (props) => {
    // const [myY,setY] = useState(0)
    // const [myX,setX] = useState(0)

    let frame = 0
    let x = props.x
    // if(x == undefined) x = 0
    let y = props.y
    // if(y == undefined) y = 0
    let characterID = props.characterID
    let roomId = props.roomId
    let limitX = 960
    // console.log(document.getElementsByClassName('Character')[0])
    let limitY = 480
    let socketId = props.socketId
    let frames = props.frame
    let dir = props.dir


    useEffect(() => {
        if(props.myCharacter =='my'){
        x = 0
        y = 0
        }
    },[props.myCharacter])

    useEffect(() => {
            // if(x !== 0){ 
            //     console.log(x)
            //     x = 0
            // }
            // if(y !== 0) {
            //     console.log('y',y)
            //     y = 0
            // }
        window.addEventListener('keypress',(e) => {
            switch(e.code){
                case 'KeyW' :
                    y - 10 > 0 ? y -= 10 : y = y
                    // frame+=1
                    frame = frame % 3 + 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'up', frame:frame})
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_up${frame}.png`
                    document.getElementsByClassName('Character')[0].style.top = y + 'px'
                    break;
                case 'KeyS' :
                    y + 10 + document.getElementsByClassName('Character')[0].offsetHeight < limitY ? y += 10 : y = y
                    frame = frame % 3 + 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'down', frame:frame})
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_down${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.top = y + 'px'
                    break;
                case 'KeyA' :
                    x - 10 > 0 ? x -= 10 : x = x
                    frame = frame % 3 + 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'left', frame:frame})
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_left${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.left = x + 'px'
                    break;
                case 'KeyD' :
                    x + 10 + document.getElementsByClassName('Character')[0].offsetWidth < limitX ? x += 10 : x = x
                    frame = frame % 3 + 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'right', frame:frame})
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_right${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.left = x + 'px'
                    break;
            }
        })
    
        window.addEventListener('keyup',(e) => {
            switch(e.code){
                case 'KeyW' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_up1.png'
                    frame = 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'up', frame:frame})
                    break;
                case 'KeyS' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_down1.png'
                    frame = 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'down', frame:frame})
                    break;
                case 'KeyA' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_left1.png'
                    frame = 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'left', frame:frame})
                    break;
                case 'KeyD' :
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_right1.png'
                    frame = 1
                    if(props.socket != undefined)
                        props.socket.emit('MOVE',{characterID,roomId,x,y, socketId, dir:'right', frame:frame})
                    break;
            }
        })
    },[])


    return(
        <div className='Character' style={{top:y, left:x}}>
            <p style={{color:'white'}}>{characterID}</p>
            <img src={`/img/male/male_walk_${dir}${frames}.png`} height='32' width='32'></img>
            <img src='/img/shadow.png' height='32' width='32' style={{position:'relative', display:'block', top:'-20px', left:'15px'}}></img>
        </div>
    )
}

export default Character