const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı');

    // Yeni kullanıcı bağlandığında, diğer kullanıcılara bağlantıyı bildir
    socket.broadcast.emit('user-connected');

    // Kullanıcıdan gelen video durumunu diğer kullanıcılara iletim
    socket.on('video-status', (status) => {
        socket.broadcast.emit('update-video-status', status);
    });

    // Kullanıcı bağlantısını kapattığında diğer kullanıcılara bildir
    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı');
        socket.broadcast.emit('user-disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server başlatıldı: http://localhost:${PORT}`);
});
app.listen(process.env.PORT || 3000)
