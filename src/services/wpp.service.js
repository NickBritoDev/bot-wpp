import fs from 'fs';
import wppconnect from '@wppconnect-team/wppconnect';

let clientWPP;
const chatLogPath = './chat.json';


const logMessageToFile = (message) => {
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

export const createWPPClient = async () => {
    try {
        clientWPP = await wppconnect.create({
            session: 'meu-bot-session',
            autoClose: 60000,
        });

        clientWPP.onMessage(autoReply);
    } catch (error) {
        console.error('Erro ao criar cliente WPPConnect:', error);
    }
};

export const sendTextMessage = async (number, text) => {
    if (!clientWPP) {
        throw new Error('Cliente WPPConnect não está inicializado.');
    }

    const formattedNumber = `${number}@c.us`;
    console.log(`Enviando mensagem para: ${formattedNumber}`);

    const messageSent = {
        type: 'out',
        number: formattedNumber,
        message: text,
        timestamp: new Date().toISOString(),
    };
    logMessageToFile(messageSent);

    return await clientWPP.sendText(formattedNumber, text);
};

export const autoReply = async (message) => {
    const { from, body, type } = message;

    console.log('Mensagem recebida:', { from, body, type });

    
    if (from === '5511965927889@c.us') return;

    const responseText = 'Estou ocupado agora. Entrarei em contato assim que puder.';
    const numberToReply = from.replace('@c.us', '');

    
    const messageReceived = {
        type: 'in',
        number: from,
        message: body || message.mediaUrl || message.caption || message.fileName, 
        timestamp: new Date().toISOString(),
        mediaType: type, 
    };

    logMessageToFile(messageReceived);

    await sendTextMessage(numberToReply, responseText);
};
