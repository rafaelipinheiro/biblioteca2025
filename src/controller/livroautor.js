import livroautor from "../model/livroautorModel.js";
import autor from "../model/autorModel.js";

async function listar (req, res){
    const dados = await livroautor.findAll();
    return res.json(dados);
};

async function selecionar (req, res) {
    await livroautor.findByPk(req.params.idlivroautor)
               .then(result => res.json(result))
               .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await livroautor.create({
            idlivro: req.body.idlivro,
            idautor: req.body.idautor
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await livroautor.update({
            idlivro: req.body.idlivro,
            idautor: req.body.idautor
        }, 
        {
            where: { idlivroautor: req.params.idlivroautor }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await livroautor.destroy({
            where: { idlivroautor: req.params.idlivroautor }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function listarAutoresLivro (req, res) {
    const dados = await livroautor.findAll({
        where: { idlivro: req.params.idlivro },
        include: [
            {
                model: autor,
                attributes: ['autor'],
                required: true,
                as: 'autor'
            }]
    });
    return res.json(dados);
};

export default { listar, selecionar, inserir, alterar, excluir, listarAutoresLivro };