import { createWPPClient } from './function/createWPPClient.js';
import app from './config/server.config.js';
import messageRoutes from './routes/wpp.route.js';

const PORT = process.env.PORT || 3002;

createWPPClient();

app.use('/api', messageRoutes);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
