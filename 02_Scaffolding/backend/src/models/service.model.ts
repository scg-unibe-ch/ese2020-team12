import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { ArticleList } from './article.model';

export interface ServiceItemAttributes {
    serviceId: number;
    title: string;
    price: string;
    description: string;
    location: string;
    articleListId: number;
}


export interface ServiceItemCreationAttributes extends Optional<ServiceItem, 'serviceId'> { }


export class ServiceItem extends Model<ServiceItemAttributes, ServiceItemCreationAttributes> implements ServiceItemAttributes {
    serviceId!: number;
    title!: string;
    price!: string;
    description!: string;
    location!: string;
    articleListId!: number;


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
                description: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                location: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                articleListId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: 'services' }
        );

    }
    public static createAssociations() {
        ServiceItem.belongsTo(ArticleList, {
            targetKey: 'articleListId',
            onDelete: 'cascade',
            foreignKey: 'articleListId'
        });
    }

}
