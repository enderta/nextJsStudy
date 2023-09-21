import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import middleware from "../../middleware";

const prisma = new PrismaClient();

const jobById = async (req, res) => {
    const id= req.query.id;

    try {
        if (req.method === "GET") {
            const job = await prisma.jobs.findUnique({
                where: {
                    id: Number(id),

                },
                include: {
                    users: true, // if you want to include related users
                }
            });

            if (!job) {
                return res.status(404).json({ message: `No job found` });
            }

            return res.status(200).json({
                status: "success",
                message: `Retrieved job with id ${id}`,
                data: job,
            }
            );
        } else if (req.method === "PUT") {
            const { title, company, location, description, requirements, is_applied, updated_at } = req.body;
            const updatedJob = await prisma.jobs.update({
                where: {
                    id: Number(id),
                },
                data: {
                    title,
                    company,
                    location,
                    description,
                    requirements,
                    is_applied,
                    updated_at
                },
            });

            return res.status(200).json({
                status: "success",
                message: `Updated job with id ${id}`,
                data: updatedJob,
            });
        }
        else if (req.method === "DELETE") {
            const deletedJob = await prisma.jobs.delete({
                where: {
                    id: Number(id),
                },
            });

            return res.status(200).json({
                status: "success",
                message: `Deleted job with id ${id}`,
                data: deletedJob,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export default middleware(jobById);

