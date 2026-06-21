// server.js
// зависимости
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

// наши модули
const {PORT} = require('./src/config')
const { registerSocketHandlers } = require('./src/socketHandlers')

const app = express()
app.use(express.static('public'))

const server = http.createServer(app)
const io = new Server(server)


app.get("/about",(req, res) => {
    res.send("<h1>Это страница о нас.</h1>")
})

registerSocketHandlers(io)

server.listen(PORT, ()=> {
    console.log('Сервер запущен: http://localhost:' + PORT)
})


