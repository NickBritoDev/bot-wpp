import { clientWPP } from "./createWPPClient.js";
import { logMessageToFile } from "./logMessageToFile.js";

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