const User = require("../model/User");
const { hashPassword, verifyPassword } = require('../utils/utils');
const { generateToken } = require('../middleware/auth');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required fields."
            })
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name: name,
            email: email,
            password: [hashedPassword]
        })

        await newUser.save();

        res.status(201).json({ message: "User Created Succesfully" });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'email already exists' });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required fields."
            })
        }
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const isPasswordValid = verifyPassword(user.password[0], password);

        if (!isPasswordValid) {

            return res.status(401).json({
                message: "Password don't match"
            })
        }

        const token = await generateToken(user);
        user.password = undefined

        res.status(200).json({
            token: token,
            user: user
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error: Field already exists.' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    register,
    login
}