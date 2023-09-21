import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (userInput) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userInput.password, salt);

    const user = await prisma.users.create({
        data: {
            username: userInput.username,
            email: userInput.email,
            password: hashedPassword,
        },
    });

    return user;
};

const user = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const user = await createUser(req.body);

            console.log(`User ${ user.username } registered successfully`);
            return res.status(200).json({ status: 'success',message:`User ${ user.username } registered successfully`, data: user });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while trying to register the user');
    }
};

export default user;