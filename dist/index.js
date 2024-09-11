"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/users', userRoutes_1.default);
app.use('/test', testRoutes_1.default);
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) {
            return res.status(401).send('Usuário não encontrado');
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Senha incorreta');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, user: user.name }, 'your_jwt_secret_key', { expiresIn: '1h' });
        console.log('rodando dev');
        res.json({ token });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Erro ao fazer login');
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
