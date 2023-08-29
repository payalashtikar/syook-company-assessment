
const crypto = require('crypto')
const myKey = '123Payal';

function decryptMessage(encryptedMessage, myKey) {
    try {
        const decipher = crypto.createDecipher('aes-256-cbc', myKey);
        let decryptedMessage = decipher.update(encryptedMessage, 'utf8', 'hex');
        decryptedMessage += decipher.final('utf8');

        console.log("decryptedMessage", decryptedMessage)
        return JSON.parse(decryptedMessage);
    }
    catch (error) {
        console.error('error : ', error.message)
    }
}

module.exports = decryptMessage;