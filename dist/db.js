"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// Configuração da conexão com o MySQL
const connection = promise_1.default.createPool({
    host: 'db4free.net',
    user: 'estudaquiz',
    password: 'estudaquiz',
    database: 'estudaquiz',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = connection;
