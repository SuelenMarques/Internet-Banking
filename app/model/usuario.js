/** Definindo os schemas para utilização na base de dados do MongoDB
 *                      USUÁRIO
*/

var mongoose = require('mongoose'); ////chamada do pacote Mongoose
var Schema = mongoose.Schema;
   
    var UsuarioSchema = new Schema({
        nome: String,
        email: String,
        telefone: String,
        cpf: String,
        data_nascimento: Date,
        senha: String,        
        estado: String,
        cidade: String,
        endereco: String,
        numero: String,
        bairro: String,
        complemento: String,
        cep: String


    });

module.exports = mongoose.model('Usuario', UsuarioSchema);
