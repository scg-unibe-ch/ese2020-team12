
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import {User} from '../models/user.model';
import {Op} from 'sequelize';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/signup',
    (req: Request, res: Response) => {
        console.log('---- Verbindung gut-------------');
        console.log('---- req gugus azeige-------------');
        console.log('name: ' + req.body.name);
        console.log('surname: ' + req.body.surname);
        console.log('username: ' + req.body.username);
        console.log('email: ' + req.body.email);
        console.log('street: ' + req.body.street);
        console.log('houseNumber: ' + req.body.houseNumber);
        console.log('place: ' + req.body.place);
        console.log('postalCode:' + req.body.postalCode);
        console.log('password:' + req.body.password);
        console.log('---- req gugus fertig-------------');
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
                    userService.register(req.body).then(registered => res.send(registered));
                } else {
                    res.status(409).send('Email or Username is already used');
                }
            }).catch(err => res.status(500).send(err));
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
