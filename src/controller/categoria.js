import categoria from "../model/categoriaModel.js";

async function listar (req, res) {
    const dados = await categoria.findAll();
    return res.json(dados);
};

async function selecionar (req, res) {
    await categoria.findByPk(req.params.idcategoria)
                   .then(result => res.json(result))
                   .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await categoria.create({
            categoria: req.body.categoria
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await categoria.update({
            categoria: req.body.categoria
        }, 
        {
            where: { idcategoria: req.params.idcategoria }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await categoria.destroy({
            where: { idcategoria: req.params.idcategoria }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

export default { listar, selecionar, inserir, alterar, excluir };