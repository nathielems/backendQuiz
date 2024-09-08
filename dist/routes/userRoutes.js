"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const users = await (0, userController_1.getUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});
router.post('/', async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const newUser = await (0, userController_1.createUser)(user);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create user' });
    }
});
exports.default = router;
