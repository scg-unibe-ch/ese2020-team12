import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';

export interface ShoppingCartItemAttributes {
    cartId: number;
    serviceId: number;
    sellProductId: number;
    lendProductId: number;
    userId: number;
}


export interface ShoppingCartItemCreationAttributes extends Optional<ShoppingCartItem, 'cartId'> { }


// tslint:disable-next-line:max-line-length
export class ShoppingCartItem extends Model<ShoppingCartItemAttributes, ShoppingCartItemCreationAttributes> implements ShoppingCartItemAttributes {
    cartId!: number;
    serviceId!: number;
    sellProductId!: number;
    lendProductId!: number;
    userId!: number;



    public static initialize(sequelize: Sequelize) { // definition for database
        ShoppingCartItem.init({
                cartId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                serviceId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                sellProductId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                lendProductId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: 'shoppingCart' }
        );

    }
    public static createAssociations() {
        ShoppingCartItem.belongsTo(User, {
            targetKey: 'userId',
            as: 'shoppingId',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }

}
