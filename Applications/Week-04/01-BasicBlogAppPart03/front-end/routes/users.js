var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('login', {});
    console.log(res);
});

router.post('/login', function(req, res, next) {
    res.render('login', {});
    console.log(res);
});

module.exports = router;