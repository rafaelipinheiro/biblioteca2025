import livro from "../model/livroModel.js";
import livroautor from "../model/livroautorModel.js";
import categoria from "../model/categoriaModel.js";
import editora from "../model/editoraModel.js";

async function listar (req, res){
    const dados = await livro.findAll({
        include: [
            {
                model: categoria,
                attributes: ['categoria'],
                required: true,
                as: 'categoria'
            },
            {
                model: editora,
                attributes: ['editora'],
                required: true,
                as: 'editora'
            }]
    });
    return res.json(dados);
};

async function selecionar (req, res) {
    await livro.findByPk(req.params.idlivro)
               .then(result => res.json(result))
               .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await livro.create({
            titulo: req.body.titulo,
            resumo: req.body.resumo,
            ano: req.body.ano,
            paginas: req.body.paginas,
            idcategoria: req.body.idcategoria,
            ideditora: req.body.ideditora
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await livro.update({
            titulo: req.body.titulo,
            resumo: req.body.resumo,
            ano: req.body.ano,
            paginas: req.body.paginas,
            idcategoria: req.body.idcategoria,
            ideditora: req.body.ideditora
        }, 
        {
            where: { idlivro: req.params.idlivro }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await livro.destroy({
            where: { idlivro: req.params.idlivro }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};


async function listarLivrosCategoria (req, res) {
    const dados = await livro.findAll({
        where: { idcategoria: req.params.idcategoria },
        include: [
            {
                model: editora,
                attributes: ['editora'],
                required: true,
                as: 'editora'
            }]
    });
    return res.json(dados);
};

//Autores do livro
/*
async function autores (req, res) {
    const dados = await livroautor.findAll({where: { idlivro: req.params.idlivro }});
    return res.json(dados);
};
*/

//Testes
async function listar2 (req, res){
    const dados = await livro.findAll({
        include: [
            {
                model: categoria,
                attributes: ['categoria'],
                required: true,
                as: 'categoria'
            },
            {
                model: editora,
                attributes: ['editora'],
                required: true,
                as: 'editora'
            }
        ]
    });
    return res.json(dados);
};


export default { listar, selecionar, inserir, alterar, excluir, listarLivrosCategoria, listar2 };