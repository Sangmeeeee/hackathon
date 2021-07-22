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
    // console.log(socket)
    socket.on('ENTER', async (data) => {
        await socket.join(data.roomId)
        // console.log('data : ',data)
        let User  = new Object()
        User['x'] = 0
        User['y'] = 0
        
        
        rooms[data.roomId][data.ID] = User
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