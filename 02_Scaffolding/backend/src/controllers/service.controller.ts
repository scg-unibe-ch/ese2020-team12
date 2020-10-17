import express from 'express';
import { Router, Request, Response } from 'express';
import { ServiceItem } from '../models/service.model';

const serviceController: Router = express.Router();

serviceController.post('/', (req: Request, res: Response) => {
    ServiceItem.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

serviceController.put('/:id', (req: Request, res: Response) => {
    ServiceItem.findByPk(req.params.id)
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

