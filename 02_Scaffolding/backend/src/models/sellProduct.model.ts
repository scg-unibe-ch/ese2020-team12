import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { ArticleList } from './article.model';

export interface SellProductItemAttributes {
    sellProductId: number;
    title: string;
    price: string;
    description: string;
    location: string;
    delivery: boolean;
    delSpec: string;
    articleListId: number;
}


export interface SProductItemCreationAttributes extends Optional<SellProductItem, 'sellProductId'> { }


export class SellProductItem extends Model<SellProductItemAttributes, SProductItemCreationAttributes> implements SellProductItemAttributes {
    sellProductId!: number;
    title!: string;
    price!: string;
    description!: string;
    location!: string;
    delivery!: boolean;
    delSpec!: string;
    articleListId!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        SellProductItem.init({
                sellProductId: {
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
                delivery: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true
                },
                delSpec: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                articleListId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: 'sellProducts' }
        );

    }
    public static createAssociations() {
        ArticleList.belongsTo(ArticleList, {
            targetKey: 'articleListId',
            as: 'sellProductList',
            onDelete: 'cascade',
            foreignKey: 'articleListId'
        });
    }

}
