"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Para interpretar JSON
// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db_1.default.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar usuários');
    }
});
// Rota para adicionar um novo usuário
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await db_1.default.query('INSERT INTO users (name, email, password) VALUES (?, ?)', [name, email, password]);
        res.status(201).send('Usuário adicionado com sucesso');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Erro ao adicionar usuário');
    }
});
// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
