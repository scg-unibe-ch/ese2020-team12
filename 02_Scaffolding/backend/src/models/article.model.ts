import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { SellProductItem } from './sellProduct.model';
import { ServiceItem } from './service.model';
import {LendProductItem} from './lendProduct.model';


export interface ArticleListAttributes {
    articleListId: number;
    userId: number;
}

export interface ArticleListCreationAttributes extends Optional<ArticleListAttributes, 'articleListId'> { }

export class ArticleList extends Model<ArticleListAttributes, ArticleListCreationAttributes> implements ArticleListAttributes {

    public static associations: {
        sellProductItems: Association<ArticleList, SellProductItem>;
        lendProductItems: Association<ArticleList, LendProductItem>;
        serviceItems: Association<ArticleList, ServiceItem>;
    };
    articleListId!: number;
    userId!: number;

    public getSellProductItems!: HasManyGetAssociationsMixin<SellProductItem>;
    public getLendProductItems!: HasManyGetAssociationsMixin<LendProductItem>;
    public getServiceItems!: HasManyGetAssociationsMixin<ServiceItem>;
    public addSellProductItem!: HasManyAddAssociationMixin<SellProductItem, number>;
    public addLendProductItem!: HasManyAddAssociationMixin<SellProductItem, number>;
    public addServiceItem!: HasManyAddAssociationMixin<ServiceItem, number>;

    public readonly SellProductItems?: SellProductItem[];
    public readonly LendProductItems?: LendProductItem[];
    public readonly serviceItems?: ServiceItem[];

    public static initialize(sequelize: Sequelize) {
        ArticleList.init(
            {
                articleListId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {tableName: 'articles', sequelize}
        );
    }

    public static createAssociations() {
        ArticleList.hasMany(SellProductItem, {
            foreignKey: 'articleListId',
        });
        ArticleList.hasMany(LendProductItem, {
            foreignKey: 'articleListId',
        });
        ArticleList.hasMany(ServiceItem, {
            foreignKey: 'articleListId'
        });
    }
}
