const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./db/conexion');

app.set('port', process.env.PORT || 3000);


// CONFIGURACIONES
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())

//RUTAS
app.use('/api/users', require('./routes/userRouter'));


app.listen(app.get('port'), console.log('Server on port ' + app.get('port')));

