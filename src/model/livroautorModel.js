import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("livroautor",
{
    idlivroautor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idlivro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'livro',
            key: 'idlivro'
        }
    },
    idautor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'autor',
            key: 'idautor'
        }
    }
}
);