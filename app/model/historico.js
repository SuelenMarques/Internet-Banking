var mongoose = require('mongoose'); 

var Schema = mongoose.Schema;

var historicoSchema = new Schema({         
     usuario_id: String,     
     numero_conta: String,
     identificador: Number,
     nome_transacao: String,
     valor: Number,
     data_transacao: Date           
 });


module.exports = mongoose.model('Historico', historicoSchema);