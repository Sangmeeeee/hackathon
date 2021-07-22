const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const server = http.Server(app)
const io = require('socket.io')(server,
    {
        cors : {
            origin:'*',
            methods : ["GET","POST"]
        }
    })

let rooms = new Object()

app.use(cors())
app.use(bodyParser.json())

server.listen(9090, () => {
    console.log('9090 port is open')
})

app.get('/api/update/room', (req, res) => {
    // console.log(req.query)
    rooms[req.query.roomId] = new Object()
    // console.log('rooms : ',rooms)
    res.send("success")
})

io.on('connection', socket => {

    socket.on('ENTER', async (data) => {
        await socket.join(data.roomId)
        // console.log('data : ',data)
        let location  = new Object()
        location['x'] = 0
        location['y'] = 0
        rooms[data.roomId][data.ID] = location
        // console.log(rooms)
        io.sockets.in(data.roomId).emit('HELLO',rooms[data.roomId])
    })

    socket.on('CHAT', (data) => {
        // console.log(data)
        io.sockets.in(data.roomId).emit('message',{ID:data.ID, message : data.message})
    })

    socket.on('MOVE', (data) => {
        // console.log(rooms)
        // console.log(data)
        // console.log(data.characterID)
        // console.log(rooms[data.roomId])
        // console.log(rooms[data.roomId][data.characterID])
        rooms[data.roomId][data.characterID].x = data.x
        rooms[data.roomId][data.characterID].y = data.y
        // io.sockets.in(data.roomId).emit('SETLOCATION', {characterID : data.characterID, x : data.x,y : data.y})
        io.sockets.in(data.roomId).emit('SETLOCATION',rooms[data.roomId])
    })


    socket.on('disconnect',() => {
    
    })
})