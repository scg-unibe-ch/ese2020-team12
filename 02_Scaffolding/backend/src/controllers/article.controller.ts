import express from 'express';
import { Router, Request, Response } from 'express';
import {ArticleList} from '../models/article.model';
import {ArticleService} from '../services/article.service';

const articleController: Router = express.Router();
const articleService = new ArticleService();

articleController.post('/', (req: Request, res: Response) => {
    articleService.postArticle(req.body).then(added => res.status(201).send(added)).catch(err => res.status(500).send(err));

});

articleController.put('/:id', (req: Request, res: Response) => {
    articleService.putArticle(req.body).then(changed => res.status(200).send(changed)).catch(err => res.status(500).send(err));
});

articleController.delete('/:id', (req: Request, res: Response) => {
    ArticleList.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy()
                    .then(item => res.status(200).send({ deleted: item }))
                    .catch(err => res.status(500).send(err));
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});

articleController.get('/', (req: Request, res: Response) => {
    console.log(req.body);
    articleService.getArticles(req.body)
        .then(list => res.status(200).send(list))
        .catch(err => res.status(500).send(err));
});

export const ArticleController: Router = articleController;
