/** Definindo os schemas para utilização na base de dados do MongoDB
 *                     MODELO DE USUÁRIO
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
   
    var UsuarioSchema = new Schema({
        nome: String,
        email: String,
        telefone: Number,
        cpf_cnpj: String,
        data_nascimento: Date,
        senha: String        
    });






module.exports = mongoose.model('Usuario', UsuarioSchema);
