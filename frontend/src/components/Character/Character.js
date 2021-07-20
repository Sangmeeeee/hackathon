import React, { useEffect, useState } from 'react'
import './Character.css'

const Character = (props) => {
    const [gender, setGender] = useState('male')
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [limitX, setlimitX] = useState(0)
    const [limitY, setlimitY] = useState(0)

    let frame = 0
    let x = 0
    let y = 0

    useEffect(() => {
    
    // setPositionY(document.getElementsByClassName('Character')[0].parentElement.offsetTop)
    // setPositionX(document.getElementsByClassName('Character')[0].parentElement.offsetLeft)
    setlimitX(document.getElementsByClassName('Character')[0].parentElement.offsetWidth + x)
    setlimitY(document.getElementsByClassName('Character')[0].parentElement.offsetHeight + y)

        window.addEventListener('keypress',(e) => {
            switch(e.code){
                case 'KeyW' :
                    y - 10 > 0 ? y -= 10 : y = y
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_up${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.top = y + 'px'
                    break;
                case 'KeyS' :
                    y + 10 < limitY ? y += 10 : y = y
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_down${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.top = y + 'px'
                    break;
                case 'KeyA' :
                    x - 10 > 0 ? x -= 10 : x = x
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_left${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.left = x + 'px'
                    break;
                case 'KeyD' :
                    x + 10 < limitX ? x += 10 : x = x
                    frame+=1
                    document.getElementsByClassName('Character')[0].children[1].src = `/img/male/male_walk_right${frame%3 + 1}.png`
                    document.getElementsByClassName('Character')[0].style.left = x + 'px'
                    break;
            }
        })

        window.addEventListener('keyup',(e) => {
            switch(e.code){
                case 'KeyW' :
                    console.log(`x : ${x}, y : ${y}`)
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_up1.png'
                    frame = 0
                    break;
                case 'KeyS' :
                    console.log(`x : ${x}, y : ${y}`)
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_down1.png'
                    frame = 0
                    break;
                case 'KeyA' :
                    console.log(`x : ${x}, y : ${y}`)
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_left1.png'
                    frame = 0
                    break;
                case 'KeyD' :
                    console.log(`x : ${x}, y : ${y}`)
                    document.getElementsByClassName('Character')[0].children[1].src = '/img/male/male_walk_right1.png'
                    frame = 0
                    break;
            }
        })
    })

    return(
        <div className='Character'>
            <p>id</p>
            <img src='/img/male/male_walk_down1.png' height='32' width='32'></img>
            <img src='/img/shadow.png' height='32' width='32' style={{position:'relative', display:'block', top:'-20px'}}></img>
        </div>
    )
}

export default Character