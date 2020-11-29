import express, {Request, Response, Router} from 'express';
import {ShoppingCartService} from '../services/shoppingCart.service';
import {User} from '../models/user.model';
import {ShoppingCartItem} from '../models/shoppingCart.model';




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


shoppingCartController.delete('/delete/item/:cartId', (req, res) => {
    ShoppingCartItem.findByPk(req.params.cartId)
        .then(found => {
            if (found != null) {
                found.destroy()
                    .then(item => res.status(200).send({ deleted: item }))
                    .catch(err => res.status(500).send(err));
            } else {
                res.sendStatus(404);
            }
        }).catch(err => res.status(500).send(err));
});

shoppingCartController.delete('/delete/:userId', (req, res) => {
    ShoppingCartItem.destroy({
        where: {
            userId: req.params.userId
        }
    }).then(item => {
        res.status(200).send({ deleted: item });
        }).
    catch(err => res.status(500).send(err));
});







export const ShoppingCartController: Router = shoppingCartController;
