var express = require('express');
var router = express.Router();
var usermodel =require('../models/db').usermodel;
var taskmodel =require('../models/db').taskmodel;
// var transporter =require('../models/mail').transporter;
var sendemail =require('../models/mail').sendemail;

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.user){
		res.render('index', { title: 'Express' });
		console.log(req.session.user);
	}else{
		res.render('suc',{title:'success'});
		console.log(req.session.user);
	}

  
});

router.get('/suc',function(req,res,next){
	res.render('suc',{title:'success'});
});

router.get('/de',function(req,res,next){
	res.render('deviceDataLici',{title:'success'});
});

router.post('/ucenter',function(req,res){
	//var query_par = {name:req.body.name};
	var newuser = {name:req.body.name,password:req.body.password};
	usermodel.count(newuser,function(err,doc){
		if(doc>=1){
			console.log("success");
			req.session.user = req.body.name;//写入session
		}else{
			console.log("failed");
		}
		res.redirect('/suc');
	});

});

router.post('/reg',function(req,res){
	var query_par = {name:req.body.name};
	var newuser =  new usermodel({
		name:req.body.name,
		password:req.body.password,
		email:req.body.email});	
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
			var mailOptions = {
                      from: '1433822301@qq.com', // sender address
                      to: req.body.email, // list of receivers
                      subject: 'Hello', // Subject line
                      text: 'text', // plaintext body
                      html: '<h1>欢迎注册能事达云平台</h1><br /><h3>长江三峡能事达电气股份有限公司是三峡集团公司的参股企业和集团公司的电气工程技术中心，是国家认定的“高新技术企业”。公司是国内极少数有能力承接水电厂二次设备“交钥匙”工程的公司之一，也是国家“大型数字式水轮机调速器产业化基地”。公司总部位于武汉洪山高新开发区，并在武汉经济开发区拥有生产加工中心。</h3><a href="http://www.nengshida.com">了解更多信息，请点击!</a><br /><img src="cid:unique@nodemailer.com"/>',
                      attachments: [{
                          filename: 'address.png',
                          path: 'models/address.png',
                          cid: 'unique@nodemailer.com' //same cid value as in the html img src
                      },
                      {
                           // file on disk as an attachment
                          filename: 'GENCESS PAC选型手册.pdf',
                          path: 'models/GENCESS PAC选型手册.pdf' // stream this file
                      }]
                  };
                  // transporter.sendMail(mailOptions, function(error, info){
                  //       if(error){
                  //           console.log(error);
                  //       }else{
                  //           console.log('Message sent: ' + info.response);
                  //       }
                  //   });
                  sendemail(mailOptions);
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
		console.log('haha');
	})
	res.redirect('/');
});


// err,newuser,numAffected
module.exports = router;
