var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index.ejs', { title: 'Quiz', errors: []});
});


//Modificar, definición de rutas de /quizes

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//router.get('/author', quizController.author);
router.get('/author', function (req, res) {
    res.render('author', { title: 'Creditos', errors: []});
});

router.get('/quizes/search', quizController.search);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);

module.exports = router;
