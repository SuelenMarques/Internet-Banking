//Base setup da Aplicação

//Chamando os pacotes para a aplicação
var express = require('express'); //chamada do pacote express
var app = express(); //atribuindo o express para a variável app
var bodyParser = require('body-parser'); //chamada do pacote BodyParser
var mongoose = require('mongoose'); //chamada do pacote Mongoose
const basicAuth = require('express-basic-auth') //chamada do pacote Basic Auth
 
//Adicionando Autenticação para realizar requisições na API
app.use(basicAuth({
    users: { 'bancode': 'GNEVS' }
}));


//Configuração da Base de Dados da Aplicação
//========================================
mongoose.connect('mongodb://banking:banking1212@ds127094.mlab.com:27094/internet-banking', { useNewUrlParser: true });

//Chamando o modelo de Usuario
var Usuario = require('./app/model/usuario')

/**Configurando a variável app para utilizar o bodyParser(). 
 * Dessa forma, conseguimos retornar os dados
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

})

/** Verbo GET de USUÁRIO (Listar todos os Usuários)
 * ========================================
*/
 //Acesso GET http://localhost:3000/api/usuarios

.get(function(req, res){
    
    //Selecionar todos os usuarios
    Usuario.find(function(err, usuarios){
        if(err)
            res.send(err);

            res.json(usuarios);        
    });
});


/** Verbo GET:ID de USUÁRIO (Listar Usuario por Id)
 * ========================================
*/
router.route('/usuarios/:usuario_id')// acesso GET:id http://localhost:8080/api/usuarios/:usuario_id) 
    
    .get(function(req, res) {
 
        //Selecionando usuario pelo ID e validando se existem erros:
        Usuario.findById(req.params.usuario_id, function(error, usuario) {
            if(error)
                res.send(error);
 
            res.json(usuario);
        });
    })

    /** Verbo GET:ID de USUÁRIO (Listar Usuario por Id)
    * ========================================
    */
    //Acessar em: PUT http://localhost:8080/api/usuarios/:usuario_id) 
    .put(function(req, res) {

        //Localizar o usuario via ID
        Usuario.findById(req.params.usuario_id, function(error, usuario) {
            if(error) 
                res.send(error);
            
            //Retornando valores atuais (realizar a alteração)
            usuario.nome = req.body.nome;
            usuario.login = req.body.login;
            usuario.senha = req.body.senha;

            //Salvando as alterações
            usuario.save(function(error) {
                if(error)
                    res.send(error);

                res.json({ message: 'Usuário Atualizado com sucesso!' });
            });
        });
    })

    /** Verbo DELETE:ID de USUÁRIO (Excluir Usuario por Id)
    * ========================================
    */
   //Acessar em: http://localhost:8080/api/usuarios/:usuario_id) */
    .delete(function(req, res) {

        //Excluindo dados e verificando possiveis erros durante o processo
        Usuario.remove({
        _id: req.params.usuario_id
        }, function(error) {
            if(error)
                res.send(error);

            res.json({ message: 'Usuário removido com Sucesso! '});
        });
    });


//Definindo prefixo 'api' para as rotas
app.use('/api', router);

//Iniciando o Servidor
app.listen(port);
console.log('Aplicação rodando em http://localhost:' + port);

