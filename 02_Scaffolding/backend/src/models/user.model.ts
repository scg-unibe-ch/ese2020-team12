import {
    Optional,
    Model,
    Sequelize,
    DataTypes,
    Association,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin
} from 'sequelize';
import {SellProductItem} from './sellProduct.model';
import {LendProductItem} from './lendProduct.model';
import {ServiceItem} from './service.model';

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
    valence: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public static associations: {
        sellProductItems: Association<User, SellProductItem>;
        lendProductItems: Association<User, LendProductItem>;
        serviceItems: Association<User, ServiceItem>;
    };

    public getSellProductItems!: HasManyGetAssociationsMixin<SellProductItem>;
    public getLendProductItems!: HasManyGetAssociationsMixin<LendProductItem>;
    public getServiceItems!: HasManyGetAssociationsMixin<ServiceItem>;
    public addSellProductItem!: HasManyAddAssociationMixin<SellProductItem, number>;
    public addLendProductItem!: HasManyAddAssociationMixin<SellProductItem, number>;
    public addServiceItems!: HasManyAddAssociationMixin<ServiceItem, number>;

    public readonly SellProductItems?: SellProductItem[];
    public readonly LendProductItems?: LendProductItem[];
    public readonly serviceItems?: ServiceItem[];
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
    valence!: number;

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
            },
            valence: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }

    public static createAssociations() {
        User.hasMany(SellProductItem, {
            as: 'sellProducts',
            foreignKey: 'userId',
        });
        User.hasMany(LendProductItem, {
            as: 'lendProducts',
            foreignKey: 'userId',
        });
        User.hasMany(ServiceItem, {
            as: 'services',
            foreignKey: 'userId'
        });
    }
}
