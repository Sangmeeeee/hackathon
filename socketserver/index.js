const fs = require('fs')
const https = require('https')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
// const server = https.createServer({
//     key : fs.readFileSync('./private.pem','utf-8'),
//     cert : fs.readFileSync('./public.pem','utf-8')
// })
const server = require('http').createServer(app)
const io = require('socket.io')(server,
    {
        cors : {
            origin:'*',
            methods : ["GET","POST"]
        }
    })
// const io = require('socket.io')

let rooms = new Object()

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`${PORT} port is open`)
})

app.get('/api/update/room', (req, res) => {
    rooms[req.query.roomId] = new Object()
    res.send("success")
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.emit('getmysocketId', {socketId: socket.id})

    socket.on('ENTER', async (data) => {
        await socket.join(data.roomId)
        let User  = new Object()
        User['x'] = 0
        User['y'] = 0
        User['socketId'] = socket.id
        rooms[data.roomId][data.ID] = User
        io.sockets.in(data.roomId).emit('HELLO',rooms[data.roomId])
    })

    socket.on('CHAT', (data) => {
        console.log('CHAT',data)
        io.sockets.in(data.roomId).emit('message',{ID:data.ID, message : data.message})
    })

    socket.on('MOVE', (data) => {
        console.log('MOVE', data)
        rooms[data.roomId][data.characterID].x = data.x
        rooms[data.roomId][data.characterID].y = data.y
        rooms[data.roomId][data.characterID].socketId = data.socketId
        rooms[data.roomId][data.characterID].dir = data.dir
        rooms[data.roomId][data.characterID].frame = data.frame
        io.sockets.in(data.roomId).emit('SETLOCATION',rooms[data.roomId])
    })

    socket.on('canIwebRTC', (data) => {
        console.log('canIwebRTC',data)
        io.to(data.remotesocketId).emit('sendSdOffer',data.mysocketId)
    })

    socket.on('webrtc',(data) => {
        console.log('webrtc',data)
        if(data.type == "SDP")
            io.to(data.socketId).emit('webrtc',data)
        else
            io.to(data.socketId).emit('webrtc',data)
    })

    socket.on('disconnect',() => {
        console.log('socket out',socket.id)
    })
})