import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// New function for login
const loginUser = async (email, password) => {
    const user = await prisma.users.findUnique({
        where: {
            email: email,
        }
    });

    if (!user) {
        throw new Error('User does not exist');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid Password');
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: "1h" });

    return {
        status: "success",
        message: "User logged in successfully",
        token: token,
        user: user
    };
};

// Original function now use loginUser
const user = async (req, res) => {
    if (req.method === "POST") {
        const { email, password } = req.body;  // This line here
        try {
            const response = await loginUser(email, password);  // And this one here
            res.json(response);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
};

export default user;