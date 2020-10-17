import express from 'express';
import { Router, Request, Response } from 'express';
import { ProductItem } from '../models/product.model';

const productController: Router = express.Router();

productController.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    ProductItem.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

productController.put('/:id', (req: Request, res: Response) => {
    ProductItem.findByPk(req.params.id)
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

productController.delete('/:id', (req: Request, res: Response) => {
    ProductItem.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

export const ProductItemController: Router = productController;
