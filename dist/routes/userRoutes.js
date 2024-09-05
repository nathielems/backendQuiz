"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = __importDefault(require("../models/userModel"));
const router = (0, express_1.Router)();
// Obter todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await userModel_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Criar um novo usuário
router.post('/', async (req, res) => {
    const user = new userModel_1.default({
        id: req.body.id,
        password: req.body.password,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
