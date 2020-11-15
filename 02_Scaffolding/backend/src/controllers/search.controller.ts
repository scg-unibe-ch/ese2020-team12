import express, {Router} from 'express';
import {SellProductItem, SellProductItemAttributes} from '../models/sellProduct.model';
import {Op} from 'sequelize';
import {LendProductItem, LendProductItemAttributes} from '../models/lendProduct.model';
import {ServiceItem, ServiceItemAttributes} from '../models/service.model';

const searchController = express.Router();

// SERV
function searchValueServ(term: any): ServiceItemAttributes[] {
    const output = [];
    for (const entry of term) {
        let count: number;
        count = 0;
        for (let i = 0; i < term.length; i++) {
            if (entry.serviceId === term[i].serviceId) {
                count++;
            }
        }
        if (count > 1) {
            output.push(entry);
        }
    }
    return output;
}
// SERV
function filterDuplicateServ(term: ServiceItemAttributes[]): any {
    const output = [];
    for (let i = 0; i < term.length; i++) {
        if (term[i] !== null) {
            output.push(term[i]);
            const lookFor = term[i].serviceId;
            for (let j = 0; j < term.length; j++) {
                if (term[j] !== null) {
                    if (lookFor === term[j].serviceId) {
                        term[j] = null;
                    }
                }
            }
        }
    }
    return output;
}


// LEND
function searchValueLend(term: any): LendProductItemAttributes[] {
    const output = [];
    for (const entry of term) {
        let count: number;
        count = 0;
        for (let i = 0; i < term.length; i++) {
            if (entry.lendProductId === term[i].lendProductId) {
                count++;
            }
        }
        if (count > 1) {
            output.push(entry);
        }
    }
    return output;
}
// LEND
function filterDuplicateLend(term: LendProductItemAttributes[]): any {
    const output = [];
    for (let i = 0; i < term.length; i++) {
        if (term[i] !== null) {
            output.push(term[i]);
            const lookFor = term[i].lendProductId;
            for (let j = 0; j < term.length; j++) {
                if (term[j] !== null) {
                    if (lookFor === term[j].lendProductId) {
                        term[j] = null;
                    }
                }
            }
        }
    }
    return output;
}


// SELL
function searchValueSell(term: any): SellProductItemAttributes[] {
    const output = [];
    for (const entry of term) {
        let count: number;
        count = 0;
        for (let i = 0; i < term.length; i++) {
            if (entry.sellProductId === term[i].sellProductId) {
                count++;
            }
        }
        if (count > 1) {
            output.push(entry);
        }
    }
 return output;
}
// SELL
function filterDuplicateSell(term: SellProductItemAttributes[]): any {
    const output = [];
    for (let i = 0; i < term.length; i++) {
        if (term[i] !== null) {
            output.push(term[i]);
            const lookFor = term[i].sellProductId;
            for (let j = 0; j < term.length; j++) {
                if (term[j] !== null) {
                    if (lookFor === term[j].sellProductId) {
                        term[j] = null;
                    }
                }
            }
        }
    }
    return output;
}




// search SellProduct
searchController.get('/sellproduct', async (req, res) => {
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
            .then(items => list.push(items))
            .catch(err => res.send(err));
    }
    const arrayList = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            arrayList.push(list[i][j].dataValues);
        }
    }
    const comparedArray = searchValueSell(arrayList);
    const uniqueArray = filterDuplicateSell(comparedArray);
    res.send(uniqueArray);

}
);

// search LendProduct
searchController.get('/lendproduct', async (req, res) => {
    const term = req.query.search as string;
    const list = [];
    const searchTerm = term.split(' ');
    for (const entry of searchTerm) {
    await LendProductItem.findAll({where: {
            [Op.and]: [
                {title: {[Op.like]: '%' + entry + '%'}},
                {description: {[Op.like]: '%' + entry + '%'}}
            ]
        }})
        .then(items => res.send(items))
        .catch(err => res.send(err));
    }
    const arrayList = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            arrayList.push(list[i][j].dataValues);
        }
    }
    const comparedArray = searchValueLend(arrayList);
    const uniqueArray = filterDuplicateLend(comparedArray);
    res.send(uniqueArray);
} );

// search Service
searchController.get('/provided-service', async (req, res) => {
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
        .then(items => res.send(items))
        .catch(err => res.send(err));
    }
    const arrayList = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            arrayList.push(list[i][j].dataValues);
        }
    }
    const comparedArray = searchValueServ(arrayList);
    const uniqueArray = filterDuplicateServ(comparedArray);
    res.send(uniqueArray);
    } );

export const SearchController: Router = searchController;
