const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
    socket.button1 = false;
    socket.button2 = false;
    socket.myTXT = '';

    socket.on('buttonClick', (buttonId) => {
        let color;
        switch(buttonId){
            case 'button1':
                color = socket.button1 ? 'white' : 'red';
                socket.button1 = !socket.button1;
                socket.emit('updateColor', { buttonId: 'button1', color });
                break;
            case 'button2':
                color = socket.button2 ? 'white' : 'green';
                socket.button2 = !socket.button2;
                socket.emit('updateColor', { buttonId: 'button2', color });
                break;
            case 'chkBox':
                socket.chkBoxIsChecked = !socket.chkBoxIsChecked;
                socket.emit('toggleCheckbox', socket.chkBoxIsChecked);
                break;
            case 'myTXT':
                socket.myTXTIsEmpty = !socket.myTXTIsEmpty;
                socket.emit('updateTextarea', socket.myTXT);
                break;
        }
    });

});


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
}
)

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server is on port:${PORT}`);
})