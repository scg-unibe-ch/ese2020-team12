import express from 'express';
import { Router, Request, Response } from 'express';
import {SellProductService} from '../services/sellProduct.service';
import {SellProductItem} from '../models/sellProduct.model';


const sellProductController: Router = express.Router();
const sellProductService = new SellProductService();


sellProductController.post('/', (req: Request, res: Response) => {
    sellProductService.postSellProduct(req.body)
        .then(added => {
            res.status(201).send(added);
        }
            )
        .catch(err => res.status(500).send(err));

});


sellProductController.put('/:id', (req: Request, res: Response) => {
    sellProductService.putSellProduct(req.body).then(changed => res.status(200).send(changed)).catch(err => res.status(500).send(err));


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
