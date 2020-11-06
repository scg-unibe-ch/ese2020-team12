import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {User} from './user.model';


export interface ProfilePhotoAttributes {
    id: number;
    userId: number;
    fileName: string;
}

export interface ProfilePhotoCreationAttributes extends Optional<ProfilePhoto, 'id'> { }

export class ProfilePhoto extends Model<ProfilePhotoAttributes, ProfilePhotoCreationAttributes> implements ProfilePhotoAttributes {
    id: number;
    userId!: number;
    fileName!: string;

    public static initialize(sequelize: Sequelize) {
        ProfilePhoto.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.INTEGER,
                },
                fileName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            },
            {sequelize, tableName: 'profileImages'}
        );
    }


    public static createAssociations() {
        ProfilePhoto.belongsTo(User, {
            targetKey: 'userId',
            as: 'profilePhoto',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
}
