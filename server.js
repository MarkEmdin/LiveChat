const express = require('express');
//const useSocket = require('socket.io');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

// подключаем для получения json данных (37минута, 2 видео)
app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});
app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  res.json([...rooms.keys()]);
});

io.on('connection', (socket) => {
  console.log('user coonected', socket.id);
});

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('server started');
});
