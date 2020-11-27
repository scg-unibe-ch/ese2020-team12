import express, { Router} from 'express';
import {SellProductItem, } from '../models/sellProduct.model';
import {
    filterDuplicateLend,
    filterDuplicateSell, filterDuplicateServ,
    searchValueLend,
    searchValueSell, searchValueServ
} from './helper/filterValue';
import {Op} from 'sequelize';
import {LendProductItem} from '../models/lendProduct.model';
import {ServiceItem} from '../models/service.model';


const filterController: Router = express.Router();


function booleanConverter(input: any): boolean {
    if (input === 'true') {
        return true;
    } else {
        return false;
    }
}




filterController.get('/sell/:category',
    async (req, res) => {
    const city = req.query.city;
    let delivery;
    if (req.query.delivery !== '') {
        delivery = booleanConverter(req.query.delivery);
    } else {
        delivery = '';
    }
    const category = req.params.category;
    const lowerPrice = Number(req.query.lowerPrice);
    let upperPrice = Number(req.query.upperPrice);
    let zeroFlag = false;
    if (req.query.upperPrice === '0') {
        upperPrice = 9999999999999;
    }
    const list = [];
    let counter = 0;
    if (city !== '') {
        counter++;
        await SellProductItem.findAll({
            where: {
                [Op.and]: [
                    {location:  city},
                    {category: category}
                ]
            }
        }).then(articles => {
            list.push(articles);
            if ( articles.length === 0 ) {
                zeroFlag = true;
            }
        })
        .catch(err => res.send(err));
    }
    if (delivery !== '') {
        counter++;
        await SellProductItem.findAll({
            where: {
                [Op.and]: [
                    {delivery: delivery},
                    {category: category}
                    ]
            }
        }).then(articles => {
            list.push(articles);
            if ( articles.length === 0 ) {
                zeroFlag = true;
            }
        })
            .catch(err => res.send(err));
    }
    await SellProductItem.findAll({
    where: {
        [Op.and]: [
            {price: {[Op.between]: [lowerPrice, upperPrice]}},
            {category: category}
        ]
    }}).then(articles => {
        list.push(articles);
        if ( articles.length === 0 ) {
            zeroFlag = true;
        }
    })
        .catch(err => res.send(err));
    const arrayList = [];
    // ----------------------------------
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            arrayList.push(list[i][j].dataValues);
        }
    }
    if (counter > 0) {
        const comparedArray = searchValueSell(arrayList);
        const uniqueArray = filterDuplicateSell(comparedArray);
        if (!zeroFlag) {
            res.send(uniqueArray);
        } else {
            res.send([]);
        }
    } else {
        if (!zeroFlag) {
            res.send(arrayList);
        } else {
            res.send([]);
        }
    }
});

filterController.get('/lend/:category',
    async (req, res) => {
        const city = req.query.city;
        const category = req.params.category;
        let lendPricePer;
        if (req.query.lendPricePer !== '') {
            lendPricePer = booleanConverter(req.query.lendPricePer);
        } else {
            lendPricePer = '';
        }
        let zeroFlag = false;
        const lowerPrice = Number(req.query.lowerPrice);
        let upperPrice = Number(req.query.upperPrice);
        if (upperPrice === 0) {
            upperPrice = 9999999999999;
        }
        const list = [];
        let counter = 0;
        if (lendPricePer !== '') {
            counter++;
            await LendProductItem.findAll({
                where: {
                    [Op.and]: [
                        {hourOrDay: lendPricePer},
                        {category: category}
                    ]
                }
            }).then(articles => {
                list.push(articles);
                if ( articles.length === 0 ) {
                    zeroFlag = true;
                }
            })
                .catch(err => res.send(err));
        }
        if (city !== '') {
            counter++;
            await LendProductItem.findAll({
                where: {
                    [Op.and]: [
                        {location:  city},
                        {category: category}
                    ]
                }
            }).then(articles => {
                list.push(articles);
                if ( articles.length === 0 ) {
                    zeroFlag = true;
                }
            })
                .catch(err => res.send(err));
        }
        await LendProductItem.findAll({
            where: {
                [Op.and]: [
                    {price: {[Op.between]: [lowerPrice, upperPrice]}},
                    {category: category}
                ]
            }
        }).then(articles => {
            list.push(articles);
            if ( articles.length === 0 ) {
                zeroFlag = true;
            }
        })
            .catch(err => res.send(err));
        const arrayList = [];
        // ----------------------------------
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                arrayList.push(list[i][j].dataValues);
            }
        }
        if (counter > 0) {
            const comparedArray = searchValueLend(arrayList);
            const uniqueArray = filterDuplicateLend(comparedArray);
            if (!zeroFlag) {
                res.send(uniqueArray);
            } else {
                res.send([]);
            }
        } else {
            if (!zeroFlag) {
                res.send(arrayList);
            } else {
                res.send([]);
            }
        }
    });


filterController.get('/provided-service',
    async (req, res) => {
        const city = req.query.city;
        const delivery = req.query.delivery;
        const category = req.query.category;
        const lowerPrice = Number(req.query.lowerPrice);
        let upperPrice = Number(req.query.upperPrice);
        if (upperPrice === 0) {
            upperPrice = 9999999999999;
        }
        const list = [];
        let counter = 0;
        if (category !== '') {
            counter++;
            await ServiceItem.findAll({
                where: {
                    category: category
                }
            }).then(articles => {
                list.push(articles);
            })
                .catch(err => res.send(err));
        }
        if (city !== null) {
            counter++;
            await ServiceItem.findAll({
                where: {
                    location: {[Op.like]: city}
                }
            }).then(articles => {
                list.push(articles);
            })
                .catch(err => res.send(err));
        }
        if (delivery !== null) {
            await ServiceItem.findAll({
                where: {
                    hourOrDay: delivery
                }
            }).then(articles => {
                list.push(articles);
            })
                .catch(err => res.send(err));
        }
        counter++;
        await ServiceItem.findAll({
            where: {
                price: {
                    [Op.between]: [lowerPrice, upperPrice]}}
        }).then(articles => {
            list.push(articles);
        })
            .catch(err => res.send(err));
        const arrayList = [];
        // ----------------------------------
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                arrayList.push(list[i][j].dataValues);
            }
        }
        if (counter > 1) {
            const comparedArray = searchValueServ(arrayList);
            const uniqueArray = filterDuplicateServ(comparedArray);
            res.send(uniqueArray);
        } else {
            res.send(arrayList);
        }
    });




export const SellFilterController: Router = filterController;



