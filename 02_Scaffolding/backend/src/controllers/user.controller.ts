
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import {User} from '../models/user.model';
import {Op} from 'sequelize';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        return User.findOne({
            where: {
                [Op.or]: [
                    {userName: req.body.userName},
                    {email : req.body.email}
                ]
            }
        })
            .then(user => {
                if (user == null) {
                    userService.register(req.body).then(registered => res.send(registered));
                } else {
                    res.send('Username or Email is already used!');
                }
            }).catch(err => Promise.reject({ message: err }));
    });

// userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

export const UserController: Router = userController;
