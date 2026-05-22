const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

exports.register = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Registered",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.json(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.json({
            messsage: "Login Successful"
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("token");

    res.json({
        message: "Logged Out"
    });
};

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id)
        .select("-password");

    res.json(user);
};