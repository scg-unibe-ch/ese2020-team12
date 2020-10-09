
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import {User} from '../models/user.model';
import {Op} from 'sequelize';

const userController: Router = express.Router();
const userService = new UserService();



userController.post('/signup',
    (req: Request, res: Response) => {
    console.log('1');
        return User.findOne({
            // look trough the database if the userName or the email already exist
            where: {
                [Op.or]: [
                    {userName: req.body.userName},
                    {email : req.body.email}
                ]
            }
        }).then(user => {
                if (user == null) {
                    // make a new account
                    console.log('it functioned');
                    userService.register(req.body).then(registered => res.status(201).send(registered));
                } else {
                    res.status(409).send('Email or Username is already used');
                }
            }).catch(err => res.status(500).send(err));
    });

// userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));

userController.delete('/:id', (req: Request, res: Response ) => {
    User.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy()
                    .then(user => res.status(200).send({ deleted: user }))
                    .catch(err => res.status(500).send(err));
            } else {
                res.sendStatus(404);
            }
        }).catch(err => res.status(500).send(err));
});



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
