var mongoose = require("mongoose");
var servidor = "localhost:27017";
var nombreBaseDatos = "contacts";

class Database {
    constructor() {
        this.conectar();
    }

    conectar() {
        mongoose.set('strictQuery', false);
        mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`).then(() => {
            console.log("Connected to Database");
        }).catch((err) => {
            console.log("Not Connected to Database ERROR! ", err);
        });

        //await mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`)
    }
}

module.exports = new Database();