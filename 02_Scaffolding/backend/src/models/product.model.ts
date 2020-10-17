import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { ArticleList } from './article.model';

export interface ProductItemAttributes {
    productId: number;
    title: string;
    price: string;
    description: string;
    location: string;
    sellOrLend: boolean;
    delivery: boolean;
    articleListId: number;
}


export interface ProductItemCreationAttributes extends Optional<ProductItem, 'productId'> { }


export class ProductItem extends Model<ProductItemAttributes, ProductItemCreationAttributes> implements ProductItemAttributes {
    productId!: number;
    title!: string;
    price!: string;
    description!: string;
    location!: string;
    sellOrLend!: boolean;
    delivery!: boolean;
    articleListId!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        ProductItem.init({
                productId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                sellOrLend: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                delivery: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true
                },
                articleListId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: 'products' }
        );

    }
    /*
    public static createAssociations() {
        ArticleList.belongsTo(ArticleList, {
            targetKey: 'articleListId',
            as: 'article',
            onDelete: 'cascade',
            foreignKey: 'articleListId'
        });
    }*/

}
