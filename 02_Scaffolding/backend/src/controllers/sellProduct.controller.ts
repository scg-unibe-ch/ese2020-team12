import express from 'express';
import { Router, Request, Response } from 'express';
import { SellProductItem } from '../models/sellProduct.model';

const sellProductController: Router = express.Router();

sellProductController.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    SellProductItem.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

sellProductController.put('/:id', (req: Request, res: Response) => {
    SellProductItem.findByPk(req.params.id)
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

sellProductController.delete('/:id', (req: Request, res: Response) => {
    SellProductItem.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

export const SellProductItemController: Router = sellProductController;
