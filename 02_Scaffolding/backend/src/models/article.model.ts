import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { ProductItem } from './product.model';
import {ServiceItem} from './service.model';
// import { ServiceItem } from './service.model';

export interface ArticleListAttributes {
    articleListId: number;
    userId: number;
}

export interface ArticleListCreationAttributes extends Optional<ArticleListAttributes, 'articleListId'> { }

export class ArticleList extends Model<ArticleListAttributes, ArticleListCreationAttributes> implements ArticleListAttributes {

    public static associations: {
        productItems: Association<ArticleList, ProductItem>;
        serviceItems: Association<ArticleList, ServiceItem>;
    };
    articleListId!: number;
    userId!: number;

    public getProductItems!: HasManyGetAssociationsMixin<ProductItem>;
    public getServiceItems!: HasManyGetAssociationsMixin<ServiceItem>;
    public addProductItem!: HasManyAddAssociationMixin<ProductItem, number>;
    public addServiceItem!: HasManyAddAssociationMixin<ServiceItem, number>;

    public readonly productItems?: ProductItem[];
    // public readonly serviceItems?: ServiceItem[];

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
            { tableName: 'articles', sequelize }
        );
    }
    /*
    public static createAssociations() {
        ArticleList.hasMany(ProductItem, {
            foreignKey: 'articleListId'
        }); /*
        ArticleList.hasMany(ServiceItem, {
            foreignKey: 'articleListId'
        });
    }*/
}
