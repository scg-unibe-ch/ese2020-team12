import express, {Request, Response, Router} from 'express';
import {LendProductItem} from '../models/lendProduct.model';
import {SellProductItem} from '../models/sellProduct.model';
import {ServiceItem} from '../models/service.model';

const getArticleController: Router = express.Router();

// get all LendProductItem
getArticleController.get('/lend/',
    (req: Request, res: Response) => {
        LendProductItem.findAll().then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);
// get all SellProductItem
getArticleController.get('/sell/',
    (req: Request, res: Response) => {
        SellProductItem.findAll().then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);
// get all ServiceItem
getArticleController.get('/service/',
    (req: Request, res: Response) => {
        ServiceItem.findAll().then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);


// get LendProduct
getArticleController.get('/lend/:id',
    (req: Request, res: Response) => {
        LendProductItem.findOne({
            where: {
                lendProductId: req.params.id
        }})
            .then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);

// get SellProduct
getArticleController.get('/sell/:id',
    (req: Request, res: Response) => {
        SellProductItem.findOne({
            where: {
                sellProductId: req.params.id
            }})
            .then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);

// get Service
getArticleController.get('/service/:id',
    (req: Request, res: Response) => {
        ServiceItem.findOne({
            where: {
                serviceId: req.params.id
            }})
            .then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);

// get all lendProducts with userId
getArticleController.get('/user/lend/:id',
    (req: Request, res: Response) => {
        LendProductItem.findAll({
            where: {
                userId: req.params.id
            }})
            .then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);


// get all sellProducts with userId
getArticleController.get('/user/sell/:id',
    (req: Request, res: Response) => {
        SellProductItem.findAll({
            where: {
                userId: req.params.id
            }})
            .then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);

// get all Services with userId
getArticleController.get('/user/service/:id',
    (req: Request, res: Response) => {
        ServiceItem.findAll({
            where: {
                userId: req.params.id
            }})
            .then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);


export const GetArticleController: Router = getArticleController;
