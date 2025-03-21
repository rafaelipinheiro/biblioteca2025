import autor from './autorModel.js';
import categoria from './categoriaModel.js';
import editora from './editoraModel.js';
import emprestimo from './emprestimoModel.js';
import livroautor from './livroautorModel.js';
import livro from './livroModel.js';
import pessoa from './pessoaModel.js';
import funcionario from '../controller/funcionario.js';

categoria.hasMany(livro, { foreignKey: 'idcategoria' });
livro.belongsTo(categoria, { as: 'categoria', foreignKey: 'idcategoria' });

editora.hasMany(livro, { foreignKey: 'ideditora' });
livro.belongsTo(editora, { as: 'editora', foreignKey: 'ideditora' });

livro.hasMany(emprestimo, { foreignKey: 'idlivro' });
emprestimo.belongsTo(livro, { as: 'livro', foreignKey: 'idlivro' });

pessoa.hasMany(emprestimo, { foreignKey: 'idpessoa' });
emprestimo.belongsTo(pessoa, { as: 'pessoa', foreignKey: 'idpessoa' });

livroautor.belongsTo(autor, { as: 'autor', foreignKey: 'idautor' });
livroautor.belongsTo(livro, { as: 'livro', foreignKey: 'idlivro' });


//https://medium.com/@rogeriothe_48115/relacionamentos-com-sequelize-guia-final-2b3baf21b2a1