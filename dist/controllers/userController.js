"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function getUsers() {
    try {
        const connection = await db_1.default.getConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        connection.release();
        return rows;
    }
    catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}
async function createUser(user) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt_1.default.hash(user.password, saltRounds);
        const connection = await db_1.default.getConnection();
        const [result] = await connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, hashedPassword]);
        connection.release();
        return {
            name: user.name,
            email: user.email,
            password: user.password
        };
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}
