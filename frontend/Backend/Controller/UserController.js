const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel');
const { generateToken } = require('../Midleware/AuthMilderware');

const sanitizeUser = (user) => {
    const plain = user.toJSON ? user.toJSON() : user;
    const { password, ...safeUser } = plain;
    return safeUser;
};

const CreateUser = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        if (!mobile || !password) {
            return res.status(400).json({ error: 'Mobile and password are required' });
        }

        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ error: 'Enter a valid 10-digit mobile number' });
        }

        if (password.length < 4) {
            return res.status(400).json({ error: 'Password must be at least 4 characters' });
        }

        const existingUser = await User.findOne({ where: { mobile } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists, please login' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = await User.create({
            mobile,
            password: hashedPassword,
            image: imagePath,
        });

        const token = generateToken(newuser);

        res.status(201).json({ message: 'User created successfully', user: sanitizeUser(newuser), token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const GetAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users.map(sanitizeUser));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }   
};

const DeleteUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(user){
            await user.destroy();
            res.status(200).json({message: 'User deleted successfully'});
        }
        else{
            res.status(404).json({error: 'User not found'});
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};


const LoginUser = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(400).json({ error: 'Mobile and password are required' });
        }

        const user = await User.findOne({ where: { mobile } });
        if (!user) {
            return res.status(404).json({ error: 'User not found. Please sign up first.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        else{
            const token = generateToken(user);
            res.status(200).json({ message: 'Login successful', user: sanitizeUser(user), token });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { CreateUser, GetAllUsers, DeleteUser, LoginUser };

