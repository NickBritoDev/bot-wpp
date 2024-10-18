import { logMessageToFile } from "./logMessageToFile.js";
import { sendTextMessage } from "./sendTextMessage.js";


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
