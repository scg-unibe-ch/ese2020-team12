import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';


export interface SellProductItemAttributes {
    sellProductId: number;
    title: string;
    price: string;
    description: string;
    location: string;
    delivery: boolean;
    delSpec: string;
    userId: number;
    category: number;
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
    userId!: number;
    category!: number;

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
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                category: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                }
            },
            { sequelize, tableName: 'sellProducts' }
        );

    }
    public static createAssociations() {
        SellProductItem.belongsTo(User, {
            targetKey: 'userId',
            as: 'articles',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }

}
