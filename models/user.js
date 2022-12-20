const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ComentarioSchema = new Schema({
    name  : {
        type: String // obligotorio
    },
    lastName : {
        type: String 
    },
    email  : {
        type: String // debe de ser unico y obligatorio
    }  
});

module.exports = mongoose.model('User', ComentarioSchema);