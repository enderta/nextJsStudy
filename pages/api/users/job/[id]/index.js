import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import middleware from "../../../middleware";


const prisma = new PrismaClient();

const createJob= async (req, res) => {
    const userId= req.query.id;
    const { title, company, location, description, requirements, is_applied, updated_at } = req.body;
    const newJob = await prisma.jobs.create({
        data: {
            title,
            company,
            location,
            description,
            requirements,
            is_applied,
            updated_at,
            users: {
                connect: {id: Number(userId)}
            }
        }
    });
    return res.status(200).json({
        status: 'success',
        message: `Inserted job with id ${newJob.id}`,
        data: newJob
    });


}

export default middleware(createJob);