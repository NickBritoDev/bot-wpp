import app from './config/server.config.js';
import { createWPPClient } from './services/wpp.service.js';
import messageRoutes from './routes/wpp.route.js';

const PORT = process.env.PORT || 3000;

createWPPClient();

app.use('/api', messageRoutes);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
