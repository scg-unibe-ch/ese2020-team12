import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import {Optional, Model, Sequelize, DataTypes, STRING} from 'sequelize';

export interface UserAttributes {
    userId: number;
    userName: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    street: string;
    houseNumber: number;
    postalCode: number;
    place: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userName!: string;
    email!: string;
    password!: string;
    name!: string;
    surname!: string;
    street!: string;
    houseNumber!: number;
    postalCode!: number;
    place!: string;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                    allowNull: false
            },
            surname: {
                type: DataTypes.STRING,
                    allowNull: false
            },
            street: {
                type: DataTypes.STRING,
                    allowNull: true
            },
            houseNumber: {
                type: DataTypes.INTEGER,
                    allowNull: true
            },
            postalCode: {
                type: DataTypes.INTEGER,
                    allowNull: true
            },
            place: {
                type: DataTypes.STRING,
                    allowNull: true
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
}
