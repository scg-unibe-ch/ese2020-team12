
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import {User} from '../models/user.model';
import {verifyUserUnique} from '../middlewares/userUnique';
import {Op} from 'sequelize';
import bcrypt from 'bcrypt';

const userController: Router = express.Router();
const userService = new UserService();



userController.post('/signup', verifyUserUnique,
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.status(201).send(registered)).catch(err => res.status(500).send(err));
    });


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

userController.put('/profile/:id', (req: Request, res: Response) => {
    User.findByPk(req.params.id).then(found => {
            if (found != null) {
                found.update(req.body).then( update => {
                    res.status(200).send(update);
                });
            } else {
                res.sendStatus(404);
            }
        }).catch(err => res.status(500).send(err));
});

userController.put('/profile/password/:id', (req: Request, res: Response) => {
    if (req.body.password !== null) {
        const saltRounds = 12;
        req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    User.findByPk(req.params.id).then(found => {
        if (found != null) {
            found.update(req.body).then( update => {
                res.status(200).send(update);
            });
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

userController.get('/profile/:id', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        User.findByPk(req.params.id).then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.get('/admin/users', verifyToken,
    (req: Request, res: Response) => {
        User.findAll({
            where: {
                userName: {[Op.ne]: 'admin'}
            }
        }).then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);



export const UserController: Router = userController;
