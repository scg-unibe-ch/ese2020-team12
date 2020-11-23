import express, {Router} from 'express';
import {SellProductItem, SellProductItemAttributes} from '../models/sellProduct.model';
import {Op} from 'sequelize';
import {LendProductItem, LendProductItemAttributes} from '../models/lendProduct.model';
import {ServiceItem, ServiceItemAttributes} from '../models/service.model';
import {
    filterDuplicateLend,
    filterDuplicateSell, filterDuplicateServ, moreWords,
    searchValueLend,
    searchValueSell,
    searchValueServ
} from './helper/filterValue';

const searchController = express.Router();



// search SellProduct
searchController.get('/sellproduct', async (req, res) => {
    try {
        const term = req.query.search as string;
        const list = [];
        const searchTerm = term.split(' ');
        for (const entry of searchTerm) {
            await SellProductItem.findAll(
                {
                    where: {
                        [Op.or]: [
                            {title: {[Op.like]: '%' + entry + '%'}},
                            {description: {[Op.like]: '%' + entry + '%'}}
                        ]
                    }
                })
                .then(items => {
                    if (items !== null) {
                        list.push(items);
                    } else {
                        res.sendStatus(404);
                    }})
                .catch(err => res.send(err));
        }
        const arrayList = [];
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                arrayList.push(list[i][j].dataValues);
            }
        }
        if (moreWords(searchTerm)) {
            const comparedArray = searchValueSell(arrayList);
            const uniqueArray = filterDuplicateSell(comparedArray);
            res.send(uniqueArray);
        } else {
            res.send(arrayList);
        }
    } catch {
        res.sendStatus(404);
    }

}
);

// search LendProduct
searchController.get('/lendproduct', async (req, res) => {
    try {
        const term = req.query.search as string;
        const list = [];
        const searchTerm = term.split(' ');
        for (const entry of searchTerm) {
            await LendProductItem.findAll({
                where: {
                    [Op.and]: [
                        {title: {[Op.like]: '%' + entry + '%'}},
                        {description: {[Op.like]: '%' + entry + '%'}}
                    ]
                }
            })
                .then(items => {
                    if (items !== null) {
                        list.push(items);
                    } else {
                        res.sendStatus(404);
                    }})
                .catch(err => res.send(err));
        }
        const arrayList = [];
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                arrayList.push(list[i][j].dataValues);
            }
        }
        if (moreWords(searchTerm)) {
            const comparedArray = searchValueLend(arrayList);
            const uniqueArray = filterDuplicateLend(comparedArray);
            res.send(uniqueArray);
        } else {
            res.send(arrayList);
        }
    } catch {
        res.sendStatus(404);
    }
} );

// search Service
searchController.get('/provided-service', async (req, res) => {
    try {
    const term = req.query.search as string;
    const list = [];
    const searchTerm = term.split(' ');
    for (const entry of searchTerm) {
    await ServiceItem.findAll({where: {
            [Op.and]: [
                {title: {[Op.like]: '%' + searchTerm + '%'}},
                {description: {[Op.like]: '%' + searchTerm + '%'}}
            ]
        }})
        .then(items => {
            if (items !== null) {
                list.push(items);
            } else {
                res.sendStatus(404);
            }})
        .catch(err => res.send(err));
    }
    const arrayList = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            arrayList.push(list[i][j].dataValues);
        }
    }
        if (moreWords(searchTerm)) {
            const comparedArray = searchValueServ(arrayList);
            const uniqueArray = filterDuplicateServ(comparedArray);
            res.send(uniqueArray);
        } else {
            res.send(arrayList);
        }
    } catch {
        res.sendStatus(404);
    }
});

export const SearchController: Router = searchController;
