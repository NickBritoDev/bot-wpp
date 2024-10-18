import wppconnect from '@wppconnect-team/wppconnect';
import { autoReply } from './autoReply.js';
export let clientWPP;

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