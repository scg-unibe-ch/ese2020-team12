import express, {Request, Response, Router} from 'express';
import {ShoppingCartService} from '../services/shoppingCart.service';




const shoppingCartController: Router = express.Router();
const shoppingCartService = new ShoppingCartService();


shoppingCartController.post('/', (req: Request, res: Response) => {
    shoppingCartService.postShoppingCart(req.body)
        .then(added => {
                res.status(201).send(added);
            }
        )
        .catch(err => res.status(500).send(err));
});

shoppingCartController.get('/:id', (req: Request, res: Response) => {
    shoppingCartService.getSellArticles(Number(req.params.id))
        .then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
});






export const ShoppingCartController: Router = shoppingCartController;
