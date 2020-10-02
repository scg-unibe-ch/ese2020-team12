
import { Request, Response } from 'express';


export async function isUsernameUnique(req: Request) {
    const username = req.body.username;
    const project = await db.findOne({where: {username: username}});
    return project ===  null;
}


export async function isEmailUnique(req: Request) {
    const email = req.body.email;
    const project = await db.findOne({where: {email: email}});
    return project === null;
}
