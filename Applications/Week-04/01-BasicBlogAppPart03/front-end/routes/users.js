var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.cookie('Cookie', 'Monster');
    res.render('login', {});
});

router.post('/login', function(req, res, next) {
    console.log('post');
    res.render('login', {});
});

router.get('/welcome', function(req, res, next) {
    res.render('welcome', { name: req.query.name });
});

module.exports = router;