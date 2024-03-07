const http = require('node:http')
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
  res.writeHead(200)
})
server.listen(8000, () => {
  console.log('Listen port 8000')
})

const ws = new WebSocket.Server({ server })
const fs = require('fs')
const messagesFile = './server/messages.json'

const connectedClients = new Set()
let newMessage
let allMessage = []

//вычитываем данные из json

try {
  const data = fs.readFileSync(messagesFile, 'utf8')
  allMessage = JSON.parse(data)
} catch (error) {
  console.error('Ошибка чтения файла сообщений:', error)
}
//
ws.on('connection', ws => {
  connectedClients.add(ws)

  ws.send('Добро пожаловать на сервер WebSocket! Вот необходиммые данные для работы')
  ws.send(JSON.stringify(allMessage))

  ws.on('message', message => {
    // код обработки сообщений от клиента здесь ниже
    let decodedMessage = message.toString('utf-8')
    console.log(`Received message: ${decodedMessage}`)
    //создаем новое сообщение и толкаем его к другим в массив
    newMessage = {
      text: decodedMessage,
    }
    allMessage.push(newMessage)
    //записывает на базу обновленный массив
    fs.writeFile(messagesFile, JSON.stringify(allMessage), err => {
      if (err) {
        console.error('Ошибка записи файла сообщений:', err)
      }
    })
    //здесь мы повторно отправляем обновленные данные уже подлюченным пользователям
    connectedClients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(allMessage))
      }
    })
  })

  ws.on('close', () => {
    connectedClients.delete(ws)
    console.log('Client disconnected')
  })
})
