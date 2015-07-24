var path = require ('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, 
    {dialect: "sqlite", storage: "quiz.sqlite"}
    );

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Exporta la definicion de la tabla Quiz 
exports.Quiz = Quiz; 

//sequelize.sync() crea e inicailiza tabla de preguntas en DB
sequelize.sync().then(function(){
    Quiz.count().then(function (count){
        if(count === 0){ //la tabla se inicializa solo si está vacia
            Quiz.create({
                pregunta: 'Capital de Italia', 
                respuesta: 'Roma'
            });
            Quiz.create({
                pregunta: 'Capital de Portugal', 
                respuesta: 'Lisboa'
            })
            .then(function(){console.log('Base de datos inicializada')});
        };
    }); 
});
