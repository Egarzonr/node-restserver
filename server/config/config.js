//=========================
// Puerto
//=========================
process.env.PORT = process.env.PORT || 3000;


//=========================
// Entorno
//=========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=========================
// Base de Datos
//=========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://m220student:m220password@mflix.ktu1t.mongodb.net/cafe?authSource=admin&replicaSet=atlas-tgpalt-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
}

process.env.URLDB = urlDB;