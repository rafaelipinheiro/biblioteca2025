import editora from "../model/editoraModel.js";

async function listar (req, res) {
    const dados = await editora.findAll();
    return res.json(dados);
};

async function selecionar (req, res) {
    await editora.findByPk(req.params.ideditora)
                   .then(result => res.json(result))
                   .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await editora.create({
            editora: req.body.editora
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await editora.update({
            editora: req.body.editora
        }, 
        {
            where: { ideditora: req.params.ideditora }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await editora.destroy({
            where: { ideditora: req.params.ideditora }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

export default { listar, selecionar, inserir, alterar, excluir };