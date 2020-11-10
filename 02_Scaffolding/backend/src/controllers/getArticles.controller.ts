import express, {Request, Response, Router} from 'express';
import {LendProductItem} from '../models/lendProduct.model';
import {SellProductItem} from '../models/sellProduct.model';
import {ServiceItem} from '../models/service.model';

const getArticleController: Router = express.Router();

getArticleController.get('/lend/',
    (req: Request, res: Response) => {
        LendProductItem.findAll().then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);

getArticleController.get('/sell/',
    (req: Request, res: Response) => {
        SellProductItem.findAll().then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);

getArticleController.get('/service/',
    (req: Request, res: Response) => {
        ServiceItem.findAll().then(list => res.status(200).send(list)).catch(err => res.status(500).send(err));
    }
);



export const GetArticleController: Router = getArticleController;
