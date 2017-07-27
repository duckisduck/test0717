var nodemailer = require('nodemailer');

var stmpConfig ={
    host:'smtp.qq.com',
    port:465,
    secure:true,
    auth:{
        user:'1433822301@qq.com',
        pass:'ygkqhaypmbbcjcdb'
    }
};

var transporter = nodemailer.createTransport(stmpConfig);

var sendemail=function(mailOptions) {
	transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
};

exports.sendemail = sendemail;
// exports.transporter = transporter;



