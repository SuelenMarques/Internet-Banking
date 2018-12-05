//Base setup da Aplicação

//Chamando os pacotes para a aplicação
var express = require('express'); //chamada do pacote express
var app = express(); //atribuindo o express para a variável app
var bodyParser = require('body-parser'); //chamada do pacote BodyParser
var mongoose = require('mongoose'); //chamada do pacote Mongoose

//Configuração da Base de Dados da Aplicação
//========================================
mongoose.connect('mongodb://banking:banking1212@ds127094.mlab.com:27094/internet-banking', { useNewUrlParser: true });

//Chamando o modelo de Usuario
var Usuario = require('./app/model/usuario')

/**Configurando a variável app para utilizar o bodyParser(). 
 * Dessa forma, conseguimos retornar os dados pelo verbo POST
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Definindo a porta de execução da aplicação */
var port = process.env.PORT || 3000;


//Rotas da API:
//========================================

//Capturando as instancias das rotas do Express
var router = express.Router();

//TESTE - Mensagem Padrão para enviar nos requests da Api (Middleware)
router.use(function(req, res, next){
    console.log('Uma requisição ocorreu ...');
    next(); //prosseguindo para a próxima rota da aplicação
}); 
 

//Rota de teste
router.get('/', function(req, res){
    res.json({ messagem: 'Api Configurada'});
});


/** Verbo POST de USUÁRIO (Criar novo Usuário)
 * ========================================
*/
router.route('/usuarios') //acesso POST http://localhost:3000/api/usuarios
.post(function(req, res){
    var usuario = new Usuario();

    //Setando dados do Usuario
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    usuario.telefone = req.body.telefone;
    usuario.cpf_cnpj = req.body.cpf_cnpj;
    usuario.data_nascimento = req.body.data_nascimento;
    usuario.senha = req.body.senha;

    usuario.save(function(error){
        if(error){
            res.send(error);
        }
        res.json({ message: 'Usuario criado com sucesso'});
    });

});


//Definindo prefixo 'api' para as rotas
app.use('/api', router);

//Iniciando o Servidor
app.listen(port);
console.log('Aplicação rodando em http://localhost:' + port);

