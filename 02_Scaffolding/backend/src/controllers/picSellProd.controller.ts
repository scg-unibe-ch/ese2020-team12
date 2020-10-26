import express from 'express';
import { Router, Request, Response } from 'express';
import { SellProductItem } from '../models/sellProduct.model';

const picSellProdController: Router = express.Router();

picSellProdController.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    SellProductItem.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

picSellProdController.put('/:id', (req: Request, res: Response) => {
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

picSellProdController.delete('/:id', (req: Request, res: Response) => {
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

export const PicSellProdController: Router = picSellProdController;
