import express from 'express';
import { Router, Request, Response } from 'express';
import { ServiceItem } from '../models/service.model';
import {ServiceProductService} from '../services/service.service';


const serviceController: Router = express.Router();
const serviceItemService = new ServiceProductService();

serviceController.post('/', (req: Request, res: Response) => {
    serviceItemService.postService(req.body).then(added => res.status(201).send(added)).catch(err => res.status(500).send(err));

});

serviceController.put('/:id', (req: Request, res: Response) => {
    ServiceItem.findByPk(req.params.id).then(found => {
        if (found != null) {
            found.update(req.body).then( update => {
                res.status(200).send(update);
            });
        } else {
            res.sendStatus(404);
        }
    }).catch(err => res.status(500).send(err));

});

serviceController.delete('/:id', (req: Request, res: Response) => {
    ServiceItem.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

export const ServiceController: Router = serviceController;

