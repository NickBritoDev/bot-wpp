import { sendTextMessage } from "../services/wpp.service.js";

export const sendMessage = async (req, res) => {
    const { number, text } = req.body;

    if (!number || !text) {
        return res.status(400).send({ message: 'Número e texto são obrigatórios.' });
    }

    try {
        await sendTextMessage(number, text);
        res.status(200).send({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).send({ message: 'Erro ao enviar mensagem.' });
    }
};
