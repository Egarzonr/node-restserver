require('./config/config')
    // Using Node.js `require()`
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//configuracion global de rutas
app.use(require('./routes/index'))

// mongoose.connect('mongodb://localhost:27017/cafe', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// });


mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000
    }
    // , (err, res) => {
    //     if (err) throw new err;
    //     console.log('Base de datos On-Line');
    // }

).catch(err => console.log(err.reason));



app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto 3000`);
})