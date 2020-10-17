import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { TodoItem } from './todoitem.model';

export interface TodoListAttributes {
    todoListId: number;
    name: string;
}

export interface TodoListCreationAttributes extends Optional<TodoListAttributes, 'todoListId'> { }

export class ArticleListO extends Model<TodoListAttributes, TodoListCreationAttributes> implements TodoListAttributes {

    public static associations: {
        todoItems: Association<ArticleListO, TodoItem>;
    };
    todoListId!: number;
    name!: string;

    public getTodoItems!: HasManyGetAssociationsMixin<TodoItem>;
    public addItem!: HasManyAddAssociationMixin<TodoItem, number>;

    public readonly todoItems?: TodoItem[];

    public static initialize(sequelize: Sequelize) {
        ArticleListO.init(
            {
                todoListId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { tableName: 'todolists', sequelize }
        );
    }
    public static createAssociations() {
        ArticleListO.hasMany(TodoItem, {
            as: 'todoItems',
            foreignKey: 'todoListId'
        });
    }
}
