var mongoose = require('mongoose');
var dbURI = 'mongodb+srv://mekan32:anilates20@mekan32.nw7rb.mongodb.net/mekan32?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true});

//Baglandiginda konsola bilgi yazdir
mongoose.connection.on('connected', function () {
    console.log('mongoose ' + dbURI+ ' adresindeki veritabanina baglanildi\n');
});

//Baglanti hatasi oldugunda konsola hata bilgisini yazdir.
mongoose.connection.on('error',function (err) {
    console.log('mongoose baglanti hatasi\n: ' + err);
});

//Baglanti kesildiginde konsola kesilme bilgisini yaz.
mongoose.connection.on('diconnected', function () {
    console.log('mongoose baglantisi kesildi\n');
});

kapat = function(msg, callback) {
    mongoose.connection.close(function(){
        console.log('mongoose kapatildi\n ' + msg);
        callback();
    });
};

//nodemon kullaniyorsan ayri bir kapatma islemi gerekir.
process.once('SIGUSR2', function(){
    kapat('nodemon kapatildi\n', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});
//Uygulama kapandiginda kapat.
process.on('SIGINT', function() {
    kapat('Uygulama kapatildi\n', function() {
        process.exit(0);
    });
});
//Herokudan kapatma islemi gerceklesirse
process.on('SIGTERM', function() {
    kapat('heroku kapatildi\n', function() {
        process.exit(0);
    });
});
require('./mekansema');
