import {PrismaClient} from '@prisma/client';
import authMiddleware from "../middleware";

const prisma = new PrismaClient();

const jobs = async (req, res) => {

    if(req.method==="GET"){
        try{
            const allJobs = await prisma.jobs.findMany({
                include: {
                    users: true, // if you want to include related users,
                }

            });
            if (!allJobs.length) {
                return res.status(404).json({message: `No job found`});
            }

            return res.status(200).json({
                status: 'success',
                message: `Retrieved ${allJobs.length} jobs`,
                data: allJobs
            });
        }catch (err) {
            console.log(err);
        }


    }
    else if(req.method==="POST"){
        const {title, company, location, description, requirements} = req.body;
        const user_id = req.params?.user_id;
        const newJob = await prisma.jobs.create({
            data: {
                title,
                company,
                location,
                description,
                requirements,
                users: {
                    connect: {id: user_id}
                }

            }
        });
        return res.status(200).json({
            status: 'success',
            message: `Inserted job with id ${newJob.id}`,
            data: newJob
        });

    }

    else {
        return res.status(405).json({message: `Method ${req.method} not allowed`});
    }
};


export default authMiddleware(jobs);