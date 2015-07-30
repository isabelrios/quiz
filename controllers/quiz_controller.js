var models = require('../models/models.js');

//GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
		res.render('quizes/new', {quiz:quiz});
};

//POST /quizes/create
exports.create = function (req, res){
	var quiz = models.Quiz.build(req.body.quiz);

//guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');
	}) //Redirección HTTP (URL relativo) lista de preguntas
};

//GET /author
exports.author = function(req, res){
	res.render('author', {autor: 'Isabel Ríos'})
};

//GET /quizes
exports.index = function(req, res){
  //models.Quiz.findAll().then(function (quizes) {
  	//res.render('quizes/index.ejs', { quizes: quizes})})
	var search = req.params.search;
	if(req.query.search) {
		var filtro = (req.query.search || '').replace(" ", "%");
		models.Quiz.findAll({where:["pregunta like ?", '%'+filtro+'%'],order:'pregunta ASC'}).then(function (quizes){
		res.render('quizes/index', {quizes: quizes});
}).catch(function (error) { next(error);});

} else {

	models.Quiz.findAll().then(function (quizes){
	res.render('quizes/index', {quizes: quizes});
}).catch(function (error) { next(error);});
}

};


//GET /quizes/:id
exports.show = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function (quiz){	
	res.render('quizes/show', { quiz: quiz});
  
  })
};

//GET /quizes/:id/answer
exports.answer = function (req, res){
  models.Quiz.findById(req.params.quizId).then(function (quiz){	
	if (req.query.respuesta === quiz.respuesta){
		res.render('quizes/answer', 
			{ quiz: quiz, respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', 
			{ quiz: quiz, respuesta: 'Incorrecto'});
	}
  })
};

//GET /quize?search
exports.search = function (req, res) {
	//res.render('quizes/search', {busqueda: 'Resultado'})
	models.Quiz.findAll({where:["pregunta like ?", search], order:"pregunta"}).then(function (quiz){
		res.render('quizes/search', { quiz: quiz});
	}
		)};
	