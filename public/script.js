const socket = io()

const loginScreen = document.getElementById('loginScreen')
const nameInput = document.getElementById('nameInput')
const joinButton = document.getElementById('joinButton')

const chatScreen = document.getElementById('chatScreen')
const messagesList = document.getElementById('messages')
const messageInput = document.getElementById('messageInput')
const sendButton = document.getElementById('sendButton')

socket.on('connect', () => {
    console.log('Подключено к серверу: ' + socket.id)
})

socket.on('disconnect', () => {
    console.log('Отключено от сервера')
})

socket.on('chatMessage', (data) => {
    const listItem = document.createElement('li')
    const time = new Date(data.time)
    const hh = String(time.getHours()).padStart(2, '0')
    const mm = String(time.getMinutes()).padStart(2, '0')
    const timeStr = `${hh}:${mm}`

    const textSpan = document.createElement('span')
    if (data.system) {
        textSpan.textContent = data.text
    }
    else {
        textSpan.textContent = `${data.name}: ${data.text}`
    }
    const timeSpan = document.createElement('span')
    timeSpan.textContent = timeStr
    timeSpan.classList.add('message-time')
    listItem.appendChild(textSpan)
    listItem.appendChild(timeSpan)

    if (data.system) {
        listItem.classList.add('system-message')
    } 
    else if (data.id === socket.id) {
        listItem.classList.add('own-message')
    }
    else {   
        listItem.classList.add('other-message')
    }
    messagesList.appendChild(listItem)
})

joinButton.addEventListener('click', () => {
    const name = nameInput.value.trim()
    if (!name) return
    socket.emit('join', name)
    loginScreen.style.display = 'none'
    chatScreen.style.display = 'block'
})


sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim()
    if (!message) return
    socket.emit('chatMessage', message)
    messageInput.value = ''
})