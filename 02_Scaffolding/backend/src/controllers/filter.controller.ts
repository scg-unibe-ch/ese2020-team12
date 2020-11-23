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




filterController.get('/sell',
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
        await SellProductItem.findAll({
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
        await SellProductItem.findAll({
            where: {
                location: {[Op.like]: city}
            }
        }).then(articles => {
            list.push(articles);
        })
        .catch(err => res.send(err));
    }
    if (delivery === 'true') {
        await SellProductItem.findAll({
            where: {
                delivery: true
            }
        }).then(articles => {
            list.push(articles);
        })
            .catch(err => res.send(err));
    }
    counter++;
    await SellProductItem.findAll({
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
        const comparedArray = searchValueSell(arrayList);
        const uniqueArray = filterDuplicateSell(comparedArray);
        res.send(uniqueArray);
    } else {
        res.send(arrayList);
    }
});

filterController.get('/lend',
    async (req, res) => {
        const city = req.query.city;
        const category = req.query.category;
        const delivery = req.query.delivery;
        console.log(delivery);
        const lowerPrice = Number(req.query.lowerPrice);
        let upperPrice = Number(req.query.upperPrice);
        if (upperPrice === 0) {
            upperPrice = 9999999999999;
        }
        const list = [];
        let counter = 0;
        if (category !== '') {
            counter++;
            await LendProductItem.findAll({
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
            await LendProductItem.findAll({
                where: {
                    location: {[Op.like]: city}
                }
            }).then(articles => {
                list.push(articles);
            })
                .catch(err => res.send(err));
        }
        if (delivery === 'true') {
            await LendProductItem.findAll({
                where: {
                    status: true
                }
            }).then(articles => {
                list.push(articles);
            })
                .catch(err => res.send(err));
        }
        counter++;
        await LendProductItem.findAll({
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
            const comparedArray = searchValueLend(arrayList);
            const uniqueArray = filterDuplicateLend(comparedArray);
            res.send(uniqueArray);
        } else {
            res.send(arrayList);
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



