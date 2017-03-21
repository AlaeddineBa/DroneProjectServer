var express = require('express');
var router = express.Router();


//Recevoir Latitude et Longitude dans le body de la requeque POST
router.post('/', function(req, res, next) {

    console.log(req.body);

    res.send('TEST');
});

module.exports = router;
