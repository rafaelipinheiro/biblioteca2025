import funcionario from "../model/funcionarioModel.js";
import jwt from "jsonwebtoken";

async function listar (req, res) {
    const dados = await funcionario.findAll();
    return res.json(dados);
};

async function selecionar (req, res) {
    await funcionario.findByPk(req.params.idfuncionario)
                   .then(result => res.json(result))
                   .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await funcionario.create({
            funcionario: req.body.funcionario,
            email: req.body.email,
            senha: req.body.senha
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await funcionario.update({
            funcionario: req.body.funcionario,
            email: req.body.email,
            senha: req.body.senha
        }, 
        {
            where: { idfuncionario: req.params.idfuncionario }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await funcionario.destroy({
            where: { idfuncionario: req.params.idfuncionario }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function login(req, res) {
    const f = await funcionario.findOne({ where: { email: req.body.email }});

    if (!f || f.senha != req.body.senha){
        res.json({"mensagem": "E-mail ou senha inválida."});
    }
    else {
        const token = jwt.sign({}, process.env.KEY); //{"nome": f.funcionario}
        res.json({"token": token});
    }
} 

export default { listar, selecionar, inserir, alterar, excluir, login };