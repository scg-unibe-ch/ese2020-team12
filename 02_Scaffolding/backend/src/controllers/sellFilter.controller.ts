import express, {Router} from 'express';
import {SellProductItem} from '../models/sellProduct.model';
import {Op} from 'sequelize';


const sellFilterController: Router = express.Router();


function placeFinder(): any {
    return SellProductItem.findAll({
        where: {
            delivery: true
        }
    });
}
function priceFinder(min: string, max: string): any {
    if (max === null) {
        max = '999999999999999999999999999';
    }
    return SellProductItem.findAll({
        where: {
            price: {[Op.between]: [Number(min), Number(max)] }
        }
    });
}

function locationFinder(loc: string): any {
    return SellProductItem.findAll({
        where: {
            location: loc
        }
    });
}

sellFilterController.get('/sell',
    async (req, res) => {
        console.log('test');
        console.log(req.query.delivery as string);
        try {
            const output = [];
            console.log(req.query.delivery);
            if (req.query.delivery === 'true') {
                output.push(await placeFinder());
            }
            if (req.query.lowerPrice !== null || req.query.upperPrice !== null) {
                const min = req.query.lowerPrice as string;
                const max = req.query.upperPrice as string;
                output.push(await priceFinder( min, max));
            }
            if (req.query.location !== null) {
                const loc = req.query.location as string;
                output.push(await locationFinder(loc));
            }
            res.status(200).send(output);
        } catch {
            res.sendStatus(999);
        }
    });


export const SellFilterController: Router = sellFilterController;
