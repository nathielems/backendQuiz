"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// Configuração da conexão com o banco de dados
const pool = promise_1.default.createPool({
    host: 'db4free.net',
    user: 'estudaquiz',
    password: 'estudaquiz',
    database: 'estudaquiz',
});
exports.default = pool;
