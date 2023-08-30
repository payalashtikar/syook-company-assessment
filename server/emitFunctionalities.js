const crypto = require('crypto')
const socketIoClient = require('socket.io-client')
const { names, origins, destinations } = require('./data.json');
const myKey = '123Payal'

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomMessage() {
    try {
        const name = getRandomElement(names);
        const origin = getRandomElement(origins);
        const destination = getRandomElement(destinations);

        const originalMessage = {
            name: name,
            origin: origin,
            destination: destination,
        };

        const secretKey = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex');
        console.log('secretKey : ', secretKey)

        return { ...originalMessage, secretKey };
    }
    catch (error) {
        console.error("error", error.message)
    }

}

function encryptMessage(message, myKey) {
    // const cipher = crypto.createCipher('aes-256-cbc',myKey);
    try {
        const cipher = crypto.createCipher('aes-256-cbc', myKey)
        let encryptedMessage = cipher.update(JSON.stringify(message), 'utf8', 'hex');
        encryptedMessage = encryptedMessage + cipher.final('hex')
        console.log('encryptedMessage : ', encryptedMessage)
        return encryptedMessage;
    }
    catch (error) {
        console.error("Error :", error.message)
    }
}

const socket = socketIoClient('http://localhost:8080')

setInterval(() => {
    const numberOfMessages = Math.floor(Math.random() * 451) + 49;
    const messages = [];

    for (let i = 0; i < numberOfMessages; i++) {
        const message = generateRandomMessage();
        messages.push(encryptMessage(message, myKey))
    }
    const dataStream = messages.join('|');
    socket.emit("dataStream", dataStream)
}, 20000)