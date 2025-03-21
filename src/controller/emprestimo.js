import emprestimo from "../model/emprestimoModel.js";
import livro from "../model/livroModel.js";
import pessoa from "../model/pessoaModel.js";
import banco from "../banco.js";
import moment from 'moment';
import { Op } from "sequelize";

async function listar (req, res) {
    const dados = await emprestimo.findAll();
    return res.json(dados);
};

async function selecionar (req, res) {
    await emprestimo.findByPk(req.params.idemprestimo)
                   .then(result => res.json(result))
                   .catch(err => res.status(400).json(err));
};

async function inserir (req, res) {
    await emprestimo.create({
            emprestimo: req.body.emprestimo,
            vencimento: req.body.vencimento,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function alterar (req, res) {
    await emprestimo.update({
            emprestimo: req.body.emprestimo,
            vencimento: req.body.vencimento,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa
        }, 
        {
            where: { idemprestimo: req.params.idemprestimo }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function excluir (req, res) {
    await emprestimo.destroy({
            where: { idemprestimo: req.params.idemprestimo }
        })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
};

async function emprestar (req, res) {
    let hoje = moment().format("YYYY-MM-DD");
    let venc = moment().add(15, 'days').format('YYYY-MM-DD');

    const t = await banco.transaction();
    
    try {

        //Inserindo emprestimo
        await emprestimo.create({
            emprestimo: hoje,
            vencimento: venc,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa
        },
        { 
            transaction: t
        });

        //Alterando status do livro 
        await livro.update({
            emprestado: true
        }, 
        {
            where: { idlivro: req.body.idlivro }
        },
        {
            transaction: t
        });

        await t.commit();
        res.json({"mensagem":"Empréstimo realizado com sucesso."});

    } catch (error) {
        await t.rollback();
        res.status(400).json(error);
    }
};

async function devolver (req, res) {
    let devolucao = moment().format("YYYY-MM-DD");

    const t = await banco.transaction();
    console.log(1);
    try {

        //Localidar o emprestimo
        const e = await emprestimo.findByPk(req.body.idemprestimo);

        //Pegar o código do livro emprestado
        const idlivro = e.idlivro; 

        //Inserindo emprestimo
        await emprestimo.update({
            devolucao: devolucao
        }, 
        {
            where: { idemprestimo: req.body.idemprestimo }
        },
        {
            transaction: t
        });

        //Alterando status do livro 
        await livro.update({
            emprestado: false
        }, 
        {
            where: { idlivro: idlivro }
        },
        {
            transaction: t
        });
        
        await t.commit();
        res.json({"mensagem":"Devolução realizada com sucesso."});

    } catch (error) {
        await t.rollback();
        res.status(400).json(error);
    }
};

async function emprestar2 (req, res) {
    try {

        //Inserindo emprestimo
        await emprestimo.create({
            emprestimo: req.body.emprestimo,
            vencimento: req.body.vencimento,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa
        });

        //Alterando status do livro 
        await livro.update({
            emprestado: true
        }, 
        {
            where: { idlivro: req.body.idlivro }
        });

        res.json({"mensagem":"Empréstimo realizado com sucesso."});

    } catch (error) {
        res.status(400).json(error);
    }
};

async function listarPendentes (req, res) {
    const dados = await emprestimo.findAll({
        where: { devolucao: null }, 
        include: [
            {
                model: livro,
                attributes: ['titulo'],
                required: true,
                as: 'livro'
            }, 
            {
                model: pessoa,
                attributes: ['pessoa'],
                required: true,
                as: 'pessoa'
            }
        ]
    });
    return res.json(dados);
};

async function listarHistoricoPessoa (req, res) {
    const dados = await emprestimo.findAll({
        where: { idpessoa: req.params.idpessoa },
        include: [
            {
                model: livro,
                attributes: ['titulo'],
                required: true,
                as: 'livro'
            }]
    });
    return res.json(dados);
};

async function listarEmprestimosPeriodo (req, res) {
    const dados = await emprestimo.findAll({
        where: { 
            emprestimo: { [Op.between]: [req.params.dtinicial, req.params.dtfinal] } 
        }
    });
    return res.json(dados);
};

export default { listar, selecionar, inserir, alterar, excluir, emprestar, devolver, emprestar2, listarPendentes, listarHistoricoPessoa, listarEmprestimosPeriodo };