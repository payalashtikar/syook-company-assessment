const express = require('express')
const app = express();
const port = 8080
const http = require('http')
const crypto = require('crypto')
const socketIo = require('socket.io')
const cors = require('cors')
const myKey = '123Payal'

app.use(cors());

// server creation
const server = http.createServer(app)
const io = socketIo(server);

// db , schema 
const dbconnection = require('./db/db')
const DataModel = require('./model/dataModel')
// const decryptMessage = require('./decryptMessage')

// call database
dbconnection()

function decryptMessage(encryptedMessage, myKey) {
    const decipher = crypto.createDecipher('aes-256-cbc', myKey);
    let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
    decryptedMessage += decipher.final('utf8');
    return JSON.parse(decryptedMessage);
}

io.on('connection', (socket) => {
    socket.on('dataStream', async (dataStream) => {
        const encryptedMessages = dataStream.split('|');
        const decryptedMessages = encryptedMessages.map((encryptedMessage) => {
            return decryptMessage(encryptedMessage, myKey);
        });

        const currentTime = new Date();

        try {
            const dataToInsert = decryptedMessages.map((message) => ({
                ...message,
                timestamp: currentTime,
            }));
            await DataModel.insertMany(dataToInsert);
            console.log(dataToInsert, 'data inserted');
        } catch (err) {
            console.error('error :', err.message);
        }
        console.log('decryptedMessages : ', decryptedMessages);
    });
});

// server listening
server.listen(port, () => {
    console.log(`listenning ${port}`)
})
