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

let rooms = new Array()

app.use(cors())
app.use(bodyParser.json())

server.listen(9090, () => {
    console.log('9090 port is open')
})

app.get('/api/update/room', (req, res) => {
    console.log(res)
    
})

io.on('connection', socket => {

    socket.on('ENTER',(data) => {
        console.log(data)
        socket.join(data.roomId)
        io.sockets.in(data.roomId).emit('hello', data.ID)
    })


    socket.on('disconnect',() => {

    })
})