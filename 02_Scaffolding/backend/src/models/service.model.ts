import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';

export interface ServiceItemAttributes {
    serviceId: number;
    title: string;
    price: string;
    hourOrDay: boolean;
    description: string;
    location: string;
    expenses: string;
    expCost: string;
    userId: number;
}


export interface ServiceItemCreationAttributes extends Optional<ServiceItem, 'serviceId'> { }


export class ServiceItem extends Model<ServiceItemAttributes, ServiceItemCreationAttributes> implements ServiceItemAttributes {
    serviceId!: number;
    title!: string;
    price!: string;
    hourOrDay!: boolean;
    description!: string;
    location!: string;
    expenses: string;
    expCost!: string;
    userId!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        ServiceItem.init({
                serviceId: {
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
                expenses: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                expCost: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: 'services' }
        );

    }
    public static createAssociations() {
        ServiceItem.belongsTo(User, {
            targetKey: 'userId',
            as: 'svArticles',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }

}
