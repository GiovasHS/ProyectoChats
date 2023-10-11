const express = require('express'); // referencia a framework express
const app = express();  //se crea la aplicacion de express
const log = require('morgan'); // para saber los clientes conectados
const bodyParse = require('body-parser');
const path = require('path');
const IndexRoutes = require('./routers/index.js');
const { default: mongoose } = require('mongoose');


app.set('port', process.env.PORT || 4000); // asignacion de puerto
app.set('view engine', 'ejs');

//MiddleWare utiliza morgan
app.use(log('dev'));
app.use(bodyParse.urlencoded({extended: false}));

app.use('/',IndexRoutes);


// sistema de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(app.get('port'), () => {
    console.log('El servidor esta funcionando en el puerto ', app.get('port'));
});

mongoose.connect("mongodb+srv://alvaradoghas6:Giovanny1@cluster0.itlehwz.mongodb.net/Chat?retryWrites=true&w=majority")
.then(db=>console.log('BD conectada'))
.catch(err=>console.log('autenticacion fallida'));
