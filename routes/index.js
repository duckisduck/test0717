var express = require('express');
var router = express.Router();
var usermodel =require('../models/db').usermodel;
var taskmodel =require('../models/db').taskmodel;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/ucenter',function(req,res){
	//var query_par = {name:req.body.name};
	var newuser = {name:req.body.name,password:req.body.password};
	usermodel.count(newuser,function(err,doc){
		if(doc>=1){
			console.log("success");
		}else{
			console.log("failed");
		}
		res.redirect('/');
	});

});

router.post('/reg',function(req,res){
	var query_par = {name:req.body.name};
	var newuser =  new usermodel({
		name:req.body.name,
		password:req.body.password});	
	usermodel.count(query_par,function(err,doc){
		if (doc>=1) {
			console.log('have been registered');
			res.redirect('/');
		}else{
			console.log('success registered');
			newuser.save(function(){
				// if(err){
				// 	console.log('save failed');
				// }
			})
			res.redirect('/');
		}
	});
});

router.post('/update',function(req,res){
	var task1 = {contractname:"aa",type:"bb",Ssupervise:"cc",weight:121,point:123};
	var task2 = {contractname:"aa",type:"bb",Ssupervise:"cc",weight:121,point:123};
	var tt1 = {name:"ehee"};
	var tt2 = {name:"ioi"};
	var newtask = new taskmodel({
		name:req.body.name,
		supervise:req.body.password,
		kaohetime:Date(),
		tasks:[task1,task2],
		temptask:[tt1],
		updatetime:Date()
	});
	newtask.save(function(){

	})
	res.redirect('/');
});


// err,newuser,numAffected
module.exports = router;
