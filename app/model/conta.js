/** Definindo os schemas para utilização na base de dados do MongoDB
 *                     CLASSE CONTA
*/

var mongoose = require('mongoose');



var Schema = mongoose.Schema;
   
    var ContaSchema = new Schema({
        numero_conta: Number,
          
             
    });

module.exports = mongoose.model('Conta', ContaSchema);
