
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import {User} from '../models/user.model';
import {verifyUserUnique} from '../middlewares/userUnique';

const userController: Router = express.Router();
const userService = new UserService();



userController.post('/signup', verifyUserUnique,
    (req: Request, res: Response) => {
        console.log(req.body);
        userService.register(req.body).then(registered => res.status(201).send(registered)).catch(err => res.status(500).send(err));
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

userController.put('/', verifyUserUnique , (req: Request, res: Response) => {
    console.log('routing ok');
    console.log(req.body.userName);
    User.findOne({
        where: {
            userName: req.body.userName
        }
    })
        .then(found => {
            if (found != null) {
                found.update(req.body).then( update => {
                    res.status(200).send(update);
                });
            } else {
                res.sendStatus(404).send('du chline spasst');
            }
        }).catch(err => res.status(500).send(err));
});



userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/profile', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll(req.body).then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);



export const UserController: Router = userController;
