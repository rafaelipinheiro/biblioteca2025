import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("livro", 
    {
        idlivro: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ano: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        paginas: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        edicao: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        resumo: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        idcategoria: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'categoria',
                key: 'idcategoria'
            }
        },
        ideditora: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'editora',
                key: 'ideditora'
            }
        },
        emprestado: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }
    }
);