const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ComentarioSchema = new Schema({
    name  : {
        type: String // obligotorio
    },
    lastName : {
        type: String 
    },
    numero:{
        type: String
    },
    usuario  : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }  
});

module.exports = mongoose.model('Contact', ComentarioSchema);