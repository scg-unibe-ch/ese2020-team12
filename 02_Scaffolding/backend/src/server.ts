import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import { UserController } from './controllers/user.controller';
import { SecuredController } from './controllers/secured.controller';
import { Sequelize } from 'sequelize';
import { User } from './models/user.model';


import cors from 'cors';
import { SellProductItemController} from './controllers/sellProduct.controller';
import {ServiceController} from './controllers/service.controller';

import {LendProductItemController} from './controllers/lendProduct.controller';
import {LendProductItem} from './models/lendProduct.model';
import {SellProductItem} from './models/sellProduct.model';
import {ServiceItem} from './models/service.model';
import {ProfilePhotoController} from './controllers/profilePhoto.controller';
import {ProfilePhoto} from './models/profilePhoto.model';
import {GetArticleController} from './controllers/getArticles.controller';
import {SearchController} from './controllers/search.controller';
import {SellFilterController} from './controllers/filter.controller';
import {GetCategoryController} from './controllers/getCategory.controller';
import {ShoppingCartController} from './controllers/shoppingCart.controller';
import {ShoppingCartItem} from './models/shoppingCart.model';



export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();
        User.initialize(this.sequelize);
        LendProductItem.initialize(this.sequelize);
        SellProductItem.initialize(this.sequelize);
        ServiceItem.initialize(this.sequelize);
        ProfilePhoto.initialize(this.sequelize);
        ShoppingCartItem.initialize(this.sequelize);
        ShoppingCartItem.createAssociations();
        ProfilePhoto.createAssociations();
        SellProductItem.createAssociations();
        LendProductItem.createAssociations();
        ServiceItem.createAssociations();

        this.sequelize.sync().then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });
    }

    private configureServer(): Application {
        // options for cors middleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
            .use(cors())
            .use(express.json())                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/add-article/sell-product', SellProductItemController)
            .use('/add-article/lend-product', LendProductItemController)
            .use('/add-article/provide-service', ServiceController)
            .use('/user', UserController)
            .use('/search', SearchController)
            .use('/user/profilephoto', ProfilePhotoController)
            .use('/secured', SecuredController)
            .use('/filter', SellFilterController)
            .use('/article', GetArticleController)
            .use('/shopping-cart', ShoppingCartController)
            .use('/category', GetCategoryController)
            .options('*', cors(options))
            .use(express.static('./src/public'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2020 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false // can be set to true for debugging
        });
    }
}

const server = new Server(); // starts the server
