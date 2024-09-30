"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVocationalResult = saveVocationalResult;
exports.getVocationalResult = getVocationalResult;
exports.getTest = getTest;
exports.getTestType = getTestType;
const db_1 = __importDefault(require("../db"));
// Função para salvar o resultado vocacional no banco
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
// Função para obter o resultado vocacional de um usuário
async function getVocationalResult(user_id) {
    try {
        const connection = await db_1.default.getConnection();
        const [rows] = await connection.query('SELECT * FROM vocational_answers WHERE user_id = ?', [user_id]);
        connection.release();
        return rows;
    }
    catch (error) {
        console.error('Error getting vocational result:', error);
        throw error;
    }
}
// Função para obter o teste (perguntas e opções) com base na matéria
async function getTest(subject) {
    if (!subject) {
        throw new Error('Matéria não informada');
    }
    try {
        const connection = await db_1.default.getConnection();
        const [questions] = await connection.execute(`
      SELECT q.id AS questionId, q.question, o.id AS optionId, o.option_label, o.option_text
      FROM questions q
      LEFT JOIN options o ON q.id = o.question_id
      WHERE q.materia = ?;
    `, [subject]);
        connection.release();
        // Organizar as perguntas e opções em uma estrutura adequada
        const questionsMap = {};
        questions.forEach((row) => {
            if (!questionsMap[row.questionId]) {
                questionsMap[row.questionId] = {
                    questionId: row.questionId,
                    question: row.question,
                    options: []
                };
            }
            questionsMap[row.questionId].options.push({
                optionId: row.optionId,
                optionLabel: row.option_label,
                optionText: row.option_text
            });
        });
        return Object.values(questionsMap);
    }
    catch (error) {
        console.error('Erro ao buscar perguntas:', error);
        throw error;
    }
}
async function getTestType() {
    try {
        const connection = await db_1.default.getConnection();
        // Consulta para buscar matérias distintas
        const [typeTest] = await connection.execute('SELECT DISTINCT materia FROM questions;');
        connection.release();
        // Retornar a lista de matérias únicas
        return typeTest;
    }
    catch (error) {
        console.error('Erro ao buscar matérias:', error);
        throw error;
    }
}
