const users = {}

function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
        console.log('Пользователь подключился: ' + socket.id)
        socket.on('chatMessage', (msg) => {
            const name = users[socket.id] || 'Гость'
            console.log('Получено сообщение от ' + name + ': ' + msg)
            // место для обработки сообщений, например, сохранение в базе данных
            io.emit('chatMessage', {
                id:socket.id,
                name: name, text: msg,
                 time: Date.now()}) 
        })

        socket.on('join', (name) => {
            console.log('Пользователь ' + name + ' присоединился с id: ' + socket.id)
            users[socket.id] = name
            io.emit('chatMessage', {
                name: 'Система',
                text: name + ' присоединился к чату.',
                system: true,
                time: Date.now()})
        })

        socket.on('disconnect', () => {
            const name = users[socket.id] 
            console.log('Пользователь отключился: ' + (name || socket.id))
            delete users[socket.id]
            if (name) {
                io.emit('chatMessage', {
                    name: 'Система', 
                    text: name + ' покинул чат.', 
                    system: true,
                    time: Date.now()
                })
            }

        })
    })
}

module.exports = { registerSocketHandlers }