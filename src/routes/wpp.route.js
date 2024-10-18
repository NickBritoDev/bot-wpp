import express from 'express';
import { sendMessage } from '../controllers/wpp.controller.js';

const router = express.Router();

router.post('/send-message', sendMessage);

export default router;
