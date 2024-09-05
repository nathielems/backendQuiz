"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Conecte ao MongoDB (altere a string de conexão conforme necessário)
mongoose_1.default.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Rotas
app.use('/users', userRoutes_1.default);
// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está rodando');
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
