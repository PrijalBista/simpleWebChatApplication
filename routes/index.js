var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function(req,res){
	 res.sendFile('chat.html',{root: path.resolve(__dirname,'../public')});
    //res.sendFile(__dirname + '/../chat.html');
  });

router.get('/privategroupchat', (req, res) => {
	 res.sendFile('privategroupchat.html',{root: path.resolve(__dirname,'../public')});
});
module.exports = router;
