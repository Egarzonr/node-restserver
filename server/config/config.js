//=========================
// Puerto
//=========================
process.env.PORT = process.env.PORT || 3000;


//=========================
// Entorno
//=========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=========================
// Vencimiento del token
//=========================
//60 segundos
//60 minutos
//24 hortas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//=========================
// seed-semilla de autenticación
//=========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
//=========================
// Base de Datos
//=========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//=========================
// Google Client ID
//=========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '968300788000-lh7c2jn5vp1ighnr2ks0ifaf4f4874pr.apps.googleusercontent.com';