import express from "express";
import banco from "./src/banco.js";
import categoria from "./src/controller/categoria.js";
import autor from "./src/controller/autor.js";
import livro from "./src/controller/livro.js";
import livroautor from "./src/controller/livroautor.js";
import pessoa from "./src/controller/pessoa.js";
import editora from "./src/controller/editora.js";
import funcionario from "./src/controller/funcionario.js";
import emprestimo from "./src/controller/emprestimo.js";
import "./src/model/relacionamentos.js";
import cors from "cors";
import jwt from "jsonwebtoken";

async function privada(req, res, next){
    const auth = req.headers['authorization'];

    //Exemplo
    const token = auth.split(' ')[1];

    if (!token){
        res.status(400).json({"mensagem":"Token é obrigatório."});
    }
    else {
        try{
            jwt.verify(token, process.env.KEY);
            next();
        }
        catch {
            res.status(400).json({"mensagem":"Token é inválido."});
        }       
    }
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({mensagem: "Oi"});
});

app.post('/login', funcionario.login);

app.get('/categoria', privada, categoria.listar);
app.get('/categoria/:idcategoria', categoria.selecionar);
app.post('/categoria', categoria.inserir);
app.put('/categoria/:idcategoria', categoria.alterar);
app.delete('/categoria/:idcategoria', categoria.excluir);

app.get('/editora', editora.listar);
app.get('/editora/:ideditora', editora.selecionar);
app.post('/editora', editora.inserir);
app.put('/editora/:ideditora', editora.alterar);
app.delete('/editora/:ideditora', editora.excluir);

app.get('/autor', autor.listar);
app.get('/autor/:idautor', autor.selecionar);
app.post('/autor', autor.inserir);
app.put('/autor/:idautor', autor.alterar);
app.delete('/autor/:idautor', autor.excluir);

app.get('/livro', livro.listar);
app.get('/livro/:idlivro', livro.selecionar);
app.post('/livro', livro.inserir);
app.put('/livro/:idlivro', livro.alterar);
app.delete('/livro/:idlivro', livro.excluir);

app.get('/livroautor', livroautor.listar);
app.get('/livroautor/:idlivroautor', livroautor.selecionar);
app.post('/livroautor', livroautor.inserir);
app.put('/livroautor/:idlivroautor', livroautor.alterar);
app.delete('/livroautor/:idlivroautor', livroautor.excluir);

app.get('/pessoa', pessoa.listar);
app.get('/pessoa/:idpessoa', pessoa.selecionar);
app.post('/pessoa', pessoa.inserir);
app.put('/pessoa/:idpessoa', pessoa.alterar);
app.delete('/pessoa/:idpessoa', pessoa.excluir);

app.get('/emprestimo', emprestimo.listar);
app.get('/emprestimo/:idemprestimo', emprestimo.selecionar);
app.post('/emprestimo', emprestimo.inserir);
app.put('/emprestimo/:idemprestimo', emprestimo.alterar);
app.delete('/emprestimo/:idemprestimo', emprestimo.excluir);

/*1) (5,0) Crie uma nova entidade no banco de dados para o controle de usuários (funcionários) da biblioteca com os
campos (nome, email e senha). Implemente os 5 métodos CRUD para esta nova entidade utilizando os verbos
adequados para cada um dos métodos. */
app.get('/funcionario', funcionario.listar);
app.get('/funcionario/:idfuncionario', funcionario.selecionar);
app.post('/funcionario', funcionario.inserir);
app.put('/funcionario/:idfuncionario', funcionario.alterar);
app.delete('/funcionario/:idfuncionario', funcionario.excluir);

/*2) (1,0) Altere o método de inserção de empréstimos, além de inserir um registro na tabela de emprestimo, o método
deve alterar o livro para indicar que ele está indisponível (livro.emprestado=true). */
app.post('/emprestimo/emprestar', emprestimo.emprestar);
app.post('/emprestimo/emprestar2', emprestimo.emprestar2);

/*3) (1,0) Implemente um método realizar a devolução de um empréstimo, ou seja, através do código de empréstimo
deve efetuar a devolução do livro. Lembre-se que esse processo deve atualizar a data de devolução e alterar o status
do livro para disponível (livro.emprestado=false). */
app.put('/emprestimo/devolver/livro', emprestimo.devolver);

/*4) (1,0) Implemente um método para retornar todos os empréstimos com devolução pendente.*/
app.get('/listar/emprestimos/pendentes', emprestimo.listarPendentes);

/*5) (1,0) Implemente um método para retornar o histórico de empréstimos de uma determinada pessoa.*/
app.get('/listar/emprestimos/pessoa/:idpessoa', emprestimo.listarHistoricoPessoa);

/*6) (1,0) Implemente um método de consulta para buscar todos os livros de uma determinada categoria*/
app.get('/listar/livros/categoria/:idcategoria', livro.listarLivrosCategoria);

/*7) (1,0) Implemente um método de consulta para buscar os autores de determinado livro.*/
app.get('/listar/autores/livro/:idlivro', livroautor.listarAutoresLivro);

/*8) (1,0) Implemente um método para retornar a lista de empréstimos de um determinado período, ou seja, receba como
parâmetro um período (data inicial e data final) retorne a lista de empréstimos ocorridos neste período pesquisado.*/
app.get('/listar/emprestimos/periodo/:dtinicial/:dtfinal', emprestimo.listarEmprestimosPeriodo);

//Teste
app.get('/listar2', livro.listar2);

//banco.authenticate();
//banco.sync(); //Para gerar o banco a partir das models

app.listen(4000, () => {
    console.log("Servidor rodando");
});