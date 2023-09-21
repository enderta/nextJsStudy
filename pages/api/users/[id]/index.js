import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import middleware from "../../middleware";

const prisma = new PrismaClient();

const userById = async (req, res) => {
    const id= req.query.id;

    try {
        if (req.method === "GET") {
            const user = await prisma.users.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    jobs: true, // if you want to include related jobs
                },
            });

            if (!user) {
                return res.status(404).json({ message: `No user found` });
            }

            return res.status(200).json({
                status: "success",
                message: `Retrieved user with id ${id}`,
                data: user,
            });
        } else if (req.method === "PUT") {
            const { username, email, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const updatedUser = await prisma.users.update({
                where: {
                    id: Number(id),
                },
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            return res.status(200).json({
                status: "success",
                message: `Updated user with id ${id}`,
                data: updatedUser,
            });
        } else if (req.method === "DELETE") {
            const deletedUser = await prisma.users.delete({
                where: {
                    id: Number(id),
                },
            });

            return res.status(200).json({
                status: "success",
                message: `Deleted user with id ${id}`,
                data: deletedUser,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export default middleware(userById);