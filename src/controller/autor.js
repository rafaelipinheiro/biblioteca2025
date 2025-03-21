import autor from "../model/autorModel.js";

async function listar (req, res) {
    const dados = await autor.findAll();
    return res.json(dados);
};

async function selecionar (req, res) {
    await autor.findByPk(req.params.idautor)
                   .then(result => res.json(result))
                   .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await autor.create({
            autor: req.body.autor
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await autor.update({
            autor: req.body.autor
        }, 
        {
            where: { idautor: req.params.idautor }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await autor.destroy({
            where: { idautor: req.params.idautor }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

export default { listar, selecionar, inserir, alterar, excluir };