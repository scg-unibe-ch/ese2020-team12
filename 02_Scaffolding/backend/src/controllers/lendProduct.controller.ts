import express from 'express';
import { Router, Request, Response } from 'express';
import {LendProductItem} from '../models/lendProduct.model';
import {LendProductService} from '../services/lendProduct.service';


const lendProductController: Router = express.Router();
const lendProductService = new LendProductService();

lendProductController.post('/', (req: Request, res: Response) => {
    lendProductService.postLendProduct(req.body).then(added => res.status(201).send(added)).catch(err => res.status(500).send(err));

});

lendProductController.put('/:id', (req: Request, res: Response) => {
    LendProductItem.findByPk(req.params.id).then(found => {
        if (found != null) {
            found.update(req.body).then( update => {
                res.status(200).send(update);
            });
        } else {
            res.sendStatus(404);
        }
    }).catch(err => res.status(500).send(err));

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
