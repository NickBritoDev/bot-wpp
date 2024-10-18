import fs from 'fs';
const chatLogPath = './chat.json';

export const logMessageToFile = (message) => {
    try {
        let chatLog = {};
        if (fs.existsSync(chatLogPath)) {
            const data = fs.readFileSync(chatLogPath);
            chatLog = JSON.parse(data);
        }

        const contactKey = message.number;
        if (!chatLog[contactKey]) {
            chatLog[contactKey] = [];
        }

        chatLog[contactKey].push(message);

        fs.writeFileSync(chatLogPath, JSON.stringify(chatLog, null, 2));
    } catch (error) {
        console.error('Erro ao gravar no arquivo chat.json:', error);
    }
};