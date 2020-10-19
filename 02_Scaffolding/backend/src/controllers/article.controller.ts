import express from 'express';
import { Router, Request, Response } from 'express';
import {ArticleList} from '../models/article.model';

const articleController: Router = express.Router();

articleController.post('/', (req: Request, res: Response) => {
    ArticleList.create(req.body).then(created => {
        res.status(201).send(created);
    })
        .catch(err => res.status(500).send( err));
});

articleController.put('/:id', (req: Request, res: Response) => {
    ArticleList.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.update(req.body).then(updated => {
                    res.status(200).send(updated);
                });
            } else {
                res.sendStatus(404);
            }

        })
        .catch(err => res.status(500).send(err));
});

articleController.delete('/:id', (req: Request, res: Response) => {
    ArticleList.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy()
                    .then(item => res.status(200).send({ deleted: item }))
                    .catch(err => res.status(500).send(err));
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

articleController.get('/', (req: Request, res: Response) => {
    // this automatically fills each ArticleList with the according productItems and serviceItems
    ArticleList.findAll(
        {include:
            [
                ArticleList.associations.sellProductItems,
                ArticleList.associations.lendProductItems,
                ArticleList.associations.serviceItems
            ]
    })
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

export const ArticleController: Router = articleController;
