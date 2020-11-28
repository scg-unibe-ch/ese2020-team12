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





export const ShoppingCartController: Router = shoppingCartController;
