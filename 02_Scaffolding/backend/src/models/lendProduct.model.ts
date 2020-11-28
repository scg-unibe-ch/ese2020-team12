import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';

export interface LendProductItemAttributes {
    lendProductId: number;
    title: string;
    price: string;
    hourOrDay: boolean;
    description: string;
    location: string;
    status: boolean;
    handling: string;
    userId: number;
    category: number;
}


export interface LProductItemCreationAttributes extends Optional<LendProductItem, 'lendProductId'> { }


export class LendProductItem extends Model<LendProductItemAttributes, LProductItemCreationAttributes> implements LendProductItemAttributes {
    lendProductId!: number;
    title!: string;
    price!: string;
    hourOrDay!: boolean;
    description!: string;
    location!: string;
    status!: boolean;
    handling!: string;
    userId!: number;
    category!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        LendProductItem.init({
                lendProductId: {
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
                    allowNull: false,
                    defaultValue: true
                },
                handling: {
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
            { sequelize, tableName: 'lendProducts' }
        );

    }
    public static createAssociations() {
        LendProductItem.belongsTo(User, {
            targetKey: 'userId',
            as: 'lArticles',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }

}
