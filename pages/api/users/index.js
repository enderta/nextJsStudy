import {PrismaClient} from '@prisma/client';
import authMiddleware from "../middleware";
import {NextApiResponse, NextApiRequest} from 'next';

const prisma = new PrismaClient();

async function getUsers(req,res) {
    try {
        if (req.method === 'GET') {
            const allUsers = await prisma.users.findMany({
                include: {
                    jobs: true, // if you want to include related jobs
                },
            });

            if (!allUsers.length) {
                return res.status(404).json({message: `No user found`});
            }

            return res.status(200).json({
                status: 'success',
                message: `Retrieved ${allUsers.length} users`,
                data: allUsers
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export default authMiddleware(getUsers);