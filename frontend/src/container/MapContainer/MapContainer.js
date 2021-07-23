import React, { useCallback, useEffect, useState } from 'react'
import './MapContainer.css'
import {Character} from '../../components/'
import { ChatContainer } from '..'
import socketio from 'socket.io-client'
import { socket_server } from '../../configs/configs'
import { Button } from 'semantic-ui-react'
import SocketContext from '../../service/SocketProvider'
import VideoContainer from '../VideoContainer/VideoContainer'
import ReactAudioPlayer from 'react-audio-player'

const pc_config = {
    iceServers : [
        {
            urls : 'stun:stun.l.google.com:19302'
        }
    ]
}


const MapContainer = (props) =>  {
    const [character, setCharacter] = useState({})
    const [mysocketId, setmysocketId] = useState(null)
    const [remotesocketId, setremotesocketId] = useState(null)
    const [chat, setChat] = useState([])
    const [socket,setsocket] = useState(null)
    const [myx, setX] = useState(0)
    const [myy, setY] = useState(0)
    

    var mx = 0

    var my = 0
    // const socket = socketio.connect(socket_server, {transports:['websocket']})
    // console.log(socket)

    // const rtcPeerConnection = new RTCPeerConnection(pc_config)
    // console.log(rtcPeerConnection)

    let roomId = props.match.params.roomId 
    
    const renderCharater = () => {
        console.log(document.getElementsByClassName('Character'))
        if(Object.keys(character).length !== 0){
        return character.map((value,idx) => {
            console.log(value)
            let ID = Object.keys(value)
            let x = value[ID].x
            let y = value[ID].y   
            let socketId = value[ID].socketId
            // console.log(value)
            // console.log('socketId',socketId)
            // console.log(value)
            // console.log(value)
            // console.log(`${ID} : ${x} , ${y}`)
            if(ID != window.sessionStorage.getItem('ID'))
            return (
                <div key={idx} onClick={async () => {
                    await setremotesocketId(value[ID].socketId) // 상대방 소켓 아이디
                    console.log(value[ID].socketId)
                    // socket.emit('canIwebRTC', {remotesocketId : socketId, mysocketId : mysocketId})
                 }} >
                    <Character className='Other'
                        roomId={roomId}
                        characterID={ID} 
                        x={value[ID].x}
                        y={value[ID].y}
                        socketId = {socketId}
                        dir={value[ID].dir}
                        frame={
                            value[ID] === 0 ? 1 : 1
                        }
                    />
                </div>
           )
     
        //    else{
            // mx = x
            // my = y
            // console.log('my,mx',my,mx)
            // document.getElementsByClassName('Character')[0].style.left = mx + 'px'
            // document.getElementsByClassName('Character')[0].style.top = my + 'px'
        //    }
        })
        }
    }


    useEffect(() => {
        console.log('socket connect')
        setsocket(socketio.connect(socket_server, {transports:['websocket']}))
    },[])
    useEffect(async () => {

        if(socket != null){
        socket.emit('ENTER',{ID : window.sessionStorage.getItem('ID'), roomId : props.match.params.roomId})

        socket.on('getmysocketId', (socketId) => {
            // let mysocketId = socketId
            // console.log(socket)
            // console.log(socketId)
            setmysocketId(socketId.socketId)
        })

        socket.on('HELLO',(data) => {
            let keys = Object.keys(data)
            let result = keys.map((value, idx) => {
                let member = new Object
                member[keys[idx]] = data[value]
                return member
            })
            console.log(result)
            setCharacter(character => [...result])
        })
        
        socket.on('SETLOCATION',(data) => {
            let keys = Object.keys(data)
            let results = keys.map((value, idx) => {
                let member = new Object
                member[keys[idx]] = data[value]
                return member
            })
            console.log('setlocation',results)
            setCharacter(character => [...results])
        })

        socket.on('message',(data) => {
            // console.log(data)
            setChat(chat => ([...chat,{name: data.ID, msg : data.message}]))
        })
    }

        // webrtc

        // socket.on('sendSdOffer', (data) => {
        //     console.log('sendSdOffer', data)
        //     sendSdpOffer(data)
        // })

        // const sendMessage = (type, payload, socketId) => {
        //     console.log('type',type)
        //     console.log('payload',payload)
        //     console.log('socketId',socketId)
        //      socket.emit('webrtc', { type, payload, socketId })
        //      }
        // const onMessage = (type, callback) => socket.on('webrtc', message => {
        //     // (message.type === type && callback(message.payload))
        //     (message.type === type && callback(message))
        // })

        // const sendSdpOffer = async (mysocketId) => {
        //     console.log('sendSdpOffer!')
        //     console.log(mysocketId)
        //     //요청을 보내는 사람
        //     const rtcSessionDescriptionInit = await rtcPeerConnection.createOffer();
        //     await rtcPeerConnection.setLocalDescription(rtcSessionDescriptionInit);
        //     await sendMessage('SDP', rtcSessionDescriptionInit, mysocketId)
        // }

        // const sendSdpAnswer = async (remotesocketId) => {
        //     console.log('sendSdpAnswer!')
        //     console.log(remotesocketId)
        //     //요청을 받는사람
        //     const rtcSessionDescriptionInit = await rtcPeerConnection.createAnswer();
        //     await rtcPeerConnection.setLocalDescription(rtcSessionDescriptionInit);
        //     sendMessage('SDP', rtcSessionDescriptionInit, remotesocketId);
        // }


        // rtcPeerConnection.addEventListener('negotiationneeded', () => { })

        // onMessage('SDP', async descriptionInit => {
        //     console.log('On message SDP',descriptionInit)
        //     const rtcSessionDescription = new RTCSessionDescription(descriptionInit.payload);

        //     console.log(rtcSessionDescription)

        //     await rtcPeerConnection.setRemoteDescription(rtcSessionDescription);

        //     if (descriptionInit.payload.type === 'offer') {
        //         // await sendSdpAnswer(descriptionInit.socketId);
        //         await sendSdpAnswer(descriptionInit.socketId);
        //     }
        // })

        // //건들 필요 x
        // rtcPeerConnection.addEventListener('icecandidate', e => e.candidate == null || sendMessage('ICE', e.candidate));
        // onMessage('ICE', candidateInit => rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidateInit)))
        // //

        // rtcPeerConnection.addEventListener('track', e => {
        //     console.log('okokok')
        //     console.log(e)
        //     console.log(document.getElementsByClassName('remoteVideo')[0])
        //     document.getElementsByClassName('remoteVideo')[0].srcObject = new MediaStream([e.track])

        //     document.getElementsByClassName('remoteVideo')[0].onloadedmetadata = function(e) {
        //         document.getElementsByClassName('remoteVideo')[0].play();
        //       };
        // });

    return() => {
        // socket.emit('reqDisconnect',({roomId,ID : window.sessionStorage.getItem('ID')}))
    }
},[socket])

    if(mysocketId != null)
    return (
        <div className='MapContainer'>
            <audio src="/sound/backgroundmusic.mp3" autoPlay loop></audio>
            <h2>room : {props.match.params.id }</h2>
            <div className="Map" >
                <Character  
                    socket={socket}
                    socketId={mysocketId}
                    myCharacter='my'
                    characterID = {window.sessionStorage.getItem('ID')}
                    roomId={roomId}
                    dir={'down'}
                    frame={'1'}
                />
                {renderCharater()}
                <ChatContainer socket={socket} roomId={props.match.params.roomId} chat={chat} ></ChatContainer>
            </div>
        </div>
    )
    else
    return(<div></div>)
}

export default MapContainer