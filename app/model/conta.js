/** Definindo os schemas para utilização na base de dados do MongoDB
 *                      CONTA
*/

var mongoose = require('mongoose'); ////chamada do pacote Mongoose

var Schema = mongoose.Schema;
   
    var ContaSchema = new Schema({         
       _id_user: String,     
        numero_conta: Number,
        saldo: Number,
        Extrato: Array      
             
    });

module.exports = mongoose.model('Conta', ContaSchema);
