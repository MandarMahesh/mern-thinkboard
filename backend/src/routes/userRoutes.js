import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const router = express.Router();

/* Signup */
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });

        if (exists)
            return res.status(400).json("User already exists");
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashPass,
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Register Failed!!!");
    }
});

/* Login */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch)
            return res.status(400).json("Invalid credentials");

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Login Failed!!!");
    }
});
export default router;
