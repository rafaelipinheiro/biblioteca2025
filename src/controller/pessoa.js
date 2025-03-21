import pessoa from "../model/pessoaModel.js";

async function listar (req, res) {
    const dados = await pessoa.findAll();
    return res.json(dados);
};

async function selecionar (req, res) {
    await pessoa.findByPk(req.params.idpessoa)
                   .then(result => res.json(result))
                   .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await pessoa.create({
            pessoa: req.body.pessoa,
            email: req.body.email,
            telefone: req.body.telefone
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await pessoa.update({
            pessoa: req.body.pessoa,
            email: req.body.email,
            telefone: req.body.telefone
        }, 
        {
            where: { idpessoa: req.params.idpessoa }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await pessoa.destroy({
            where: { idpessoa: req.params.idpessoa }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

export default { listar, selecionar, inserir, alterar, excluir };