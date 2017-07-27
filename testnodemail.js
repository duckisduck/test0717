var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '1433822301@qq.com',
        pass: 'iyqkjfcpnoaujjab'
    }
});

var mailOptions = {
    from: '1433822301@qq.com ', // sender address
    to: '535560816@qq.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world </b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});