//Base setup da Aplicação

//Chamando os pacotes para a aplicação
var express = require('express'); //chamada do pacote express
var app = express(); //atribuindo o express para a variável app
var bodyParser = require('body-parser'); //chamada do pacote BodyParser
var mongoose = require('mongoose'); //chamada do pacote Mongoose
const basicAuth = require('express-basic-auth') //chamada do pacote Basic Auth
 
//Adicionando Autenticação para realizar requisições na API
// app.use(basicAuth({
//     users: { 'bancode': 'GNEVS' }
// }));


//Configuração da Base de Dados da Aplicação
//========================================
mongoose.connect('mongodb://banking:banking1212@ds127094.mlab.com:27094/internet-banking', { useNewUrlParser: true });

var Usuario = require('./app/model/usuario'); ////Chamando o modelo de Usuario
var Conta = require('./app/model/conta'); //Chamando o modelo de Conta

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

//Mensagem Padrão para enviar nos requests da Api (Middleware)
router.use(function(req, res, next){
    console.log('Uma requisição ocorreu ...');
    next(); //prosseguindo para a próxima rota da aplicação
}); 
 

//Rota de teste
router.get('/', function(req, res){
    res.json({ messagem: 'Api Configurada'});
});




/**        ROTAS USUARIO
 * ========================================
*/


//Acesso POST http://localhost:3000/api/usuarios
router.route('/usuarios') 
.post(function(req, res){
    var usuario = new Usuario();
    var conta = new Conta();
    
    //Setando dados do Usuario / Conta
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    usuario.telefone = req.body.telefone;
    usuario.cpf = req.body.cpf;
    usuario.data_nascimento = req.body.data_nascimento;
    usuario.senha = req.body.senha;
    usuario.estado = req.body.estado;
    usuario.cidade = req.body.cidade;
    usuario.endereco = req.body.endereco;
    usuario.numero = req.body.numero;
    usuario.bairro = req.body.bairro;
    usuario.complemento = req.body.complemento;
    usuario.cep = req.body.cep;
    conta._id_user = usuario._id;
    conta.numero_conta =  getRandom();
    conta.saldo = 0;
    
    function getRandom() {
        return (Math.floor(Math.random() * 1000000000) - 1000)
    }
    
    usuario.save(function(error){
        if(error){
            res.send(error);
        }
        res.json({ message: 'Usuario criado com sucesso'});
    }); 

    conta.save(function(error){
        if(error){
            res.send(error);
        }        
    });

})


//Acesso GET http://localhost:3000/api/usuarios
.get(function(req, res){
    
    //Selecionar todos os usuarios
    Usuario.find(function(err, usuarios){
        if(err)
            res.send(err);

            res.json(usuarios);        
    });
});


// Acesso GET:id http://localhost:8080/api/usuarios/:usuario_id) 
router.route('/usuarios/:usuario_id')
    
    .get(function(req, res) {
 
        //Selecionando usuario pelo ID e validando se existem erros:
        Usuario.findById(req.params.usuario_id, function(error, usuario) {
            if(error)
                res.send(error);
 
            res.json(usuario);
        });
    })

   
//Acessar em: PUT http://localhost:8080/api/usuarios/:usuario_id) 
.put(function(req, res) {

        //Localizar o usuario via ID
        Usuario.findById(req.params.usuario_id, function(error, usuario) {
            if(error) 
                res.send(error);
            
            //Retornando valores atuais (realizar a alteração)
            usuario.nome = req.body.nome;
            usuario.email = req.body.email;
            usuario.telefone = req.body.telefone;
            usuario.cpf = req.body.cpf;
            usuario.data_nascimento = req.body.data_nascimento;
            usuario.senha = req.body.senha;
            usuario.estado = req.body.estado;
            usuario.cidade = req.body.cidade;
            usuario.endereco = req.body.endereco;
            usuario.numero = req.body.numero;
            usuario.bairro = req.body.bairro;
            usuario.complemento = req.body.complemento;
            usuario.cep = req.body.cep;                    

            //Salvando as alterações
            usuario.save(function(error) {
                if(error)
                    res.send(error);

                res.json({ message: 'Usuário Atualizado com sucesso!' });
            });
        });
    })

   
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





/**        ROTAS CONTA
* ========================================
*/
router.route('/contas')

//Acesso GET http://localhost:3000/api/usuarios
.get(function(req, res){
    
    //Selecionar todos os usuarios
    Conta.find(function(err, contas){
        if(err)
            res.send(err);

            res.json(contas);        
    });
});







//Definindo prefixo 'api' para as rotas
app.use('/api', router);

//Iniciando o Servidor
app.listen(port);
console.log('Aplicação rodando em http://localhost:' + port);

