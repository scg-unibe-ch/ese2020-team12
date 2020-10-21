import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { ArticleList } from './article.model';

export interface LendProductItemAttributes {
    productId: number;
    title: string;
    price: string;
    hourOrDay: boolean;
    description: string;
    location: string;
    status: boolean;
    handling: string;
    articleListId: number;
}


export interface LProductItemCreationAttributes extends Optional<LendProductItem, 'productId'> { }


export class LendProductItem extends Model<LendProductItemAttributes, LProductItemCreationAttributes> implements LendProductItemAttributes {
    productId!: number;
    title!: string;
    price!: string;
    hourOrDay!: boolean;
    description!: string;
    location!: string;
    status!: boolean;
    handling!: string;
    articleListId!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        LendProductItem.init({
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
                hourOrDay: {
                    type: DataTypes.BOOLEAN,
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
                status: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                handling: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                articleListId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: 'lendProducts' }
        );

    }
    public static createAssociations() {
        ArticleList.belongsTo(ArticleList, {
            targetKey: 'articleListId',
            onDelete: 'cascade',
            foreignKey: 'articleListId'
        });
    }

}