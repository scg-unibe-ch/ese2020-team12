import express, {Router} from 'express';
import {SellProductItem} from '../models/sellProduct.model';
import {LendProductItem} from '../models/lendProduct.model';
import {ServiceItem} from '../models/service.model';

const getCategoryController: Router = express.Router();


getCategoryController.get('/sell/:id', ( req, res) => {
    SellProductItem.findAll({
        where: {
            category: req.params.id
        }
    }).then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
});

getCategoryController.get('/lend/:id', ( req, res) => {
    LendProductItem.findAll({
        where: {
            category: req.params.id
        }
    }).then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
});

getCategoryController.get('/service/:id', ( req, res) => {
    ServiceItem.findAll({
        where: {
            category: req.params.id
        }
    }).then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
});


export const GetCategoryController: Router = getCategoryController;
