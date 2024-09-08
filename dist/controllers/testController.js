"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVocationalResult = saveVocationalResult;
exports.getVocationalResult = getVocationalResult;
const db_1 = __importDefault(require("../db"));
async function saveVocationalResult(user_id, maxOption) {
    try {
        const connection = await db_1.default.getConnection();
        await connection.query('INSERT INTO vocational_answers (user_id, answer) VALUES (?, ?)', [user_id, maxOption]);
        connection.release();
    }
    catch (error) {
        console.error('Error saving vocational result:', error);
        throw error;
    }
}
async function getVocationalResult(user_id) {
    try {
        const connection = await db_1.default.getConnection();
        const [rows] = await connection.query('SELECT * FROM vocational_answers WHERE user_id = ?', [user_id]);
        return rows;
    }
    catch (error) {
        console.error('Error getting vocational result:', error);
        throw error;
    }
}
