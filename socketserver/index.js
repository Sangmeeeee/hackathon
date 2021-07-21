const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const server = http.createServer(app)
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
    console.log(req)
    res.send("success")
})

io.on('connection', socket => {

    socket.on('ENTER',(data) => {
        console.log(data)
        // socket.join(data.roomId, () => {
        //     console.log(`${data.ID}가 ${data.roomId}에 참여했습니다.`)
        //     socket.emit('check')
        // })
    })

    socket.join('a', () => {
        console.log('asd')
    })

    socket.on('disconnect',() => {

    })
})