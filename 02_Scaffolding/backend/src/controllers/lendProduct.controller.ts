import express from 'express';
import { Router, Request, Response } from 'express';
import {LendProductItem} from '../models/lendProduct.model';

const lendProductController: Router = express.Router();

lendProductController.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    LendProductItem.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

lendProductController.put('/:id', (req: Request, res: Response) => {
    LendProductItem.findByPk(req.params.id)
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

lendProductController.delete('/:id', (req: Request, res: Response) => {
    LendProductItem.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

export const LendProductItemController: Router = lendProductController;
