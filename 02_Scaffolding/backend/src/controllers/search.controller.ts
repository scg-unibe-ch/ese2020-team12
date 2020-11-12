import express, {Router} from 'express';
import {SellProductItem} from '../models/sellProduct.model';
import {Op} from 'sequelize';
import {LendProductItem} from '../models/lendProduct.model';
import {ServiceItem} from '../models/service.model';

const searchController = express.Router();


function searchValue(term: string): string[] {
    const wordArray = term.split(' ');
    const outputArray = [];
    for (const entry of wordArray) {
        outputArray.push('%' + entry + '%');
    }
    return outputArray;
}


// search SellProduct
searchController.get('/sellproduct', async (req, res) => {
    const term = req.query.search as string;
    const searchTerm = term.replace(/\s/gi, '%');
    await SellProductItem.findAll(
        {where: {
        [Op.or]: [
            {title: {[Op.like]: '%' + searchTerm + '%'}},
            {description: {[Op.like]: '%' + searchTerm + '%'}}
            ]
        }})
        .then(items => res.send(items))
        .catch(err => res.send(err));
} );

// search LendProduct
searchController.get('/lendproduct', async (req, res) => {
    const term = req.query.search as string;
    const searchTerm = term.replace(/\s/gi, '%');
    await LendProductItem.findAll({where: {
            [Op.and]: [
                {title: {[Op.like]: '%' + searchTerm + '%'}},
                {description: {[Op.like]: '%' + searchTerm + '%'}}
            ]
        }})
        .then(items => res.send(items))
        .catch(err => res.send(err));
} );

// search Service
searchController.get('/provided-service', async (req, res) => {
    const term = req.query.search as string;
    const searchTerm = term.replace(/\s/gi, '%');
    await ServiceItem.findAll({where: {
            [Op.and]: [
                {title: {[Op.like]: '%' + searchTerm + '%'}},
                {description: {[Op.like]: '%' + searchTerm + '%'}}
            ]
        }})
        .then(items => res.send(items))
        .catch(err => res.send(err));
} );

export const SearchController: Router = searchController;
