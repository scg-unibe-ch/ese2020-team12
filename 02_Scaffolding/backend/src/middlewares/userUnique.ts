import {User} from '../models/user.model';
import { Request, Response } from 'express';


// this way you can just define a function and export it instead of a whole class
export function verifyUserUnique(req: Request, res: Response, next: any) {
    return User.findOne({
        // look trough the database if the userName or the email already exist
        where: {
                userName: req.body.userName
        }
    }).then(user => {
        if (user == null) {
            return User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(userEmail => {
                if (userEmail == null) {
                    next();
                } else {
                    res.status(409).send('Email is already used');
                }
            });
        } else {
            res.status(409).send('Username is already used');
        }
    }); }
