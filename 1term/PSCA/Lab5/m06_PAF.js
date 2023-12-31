const nodemailer = require('nodemailer');

const receiver = 'artemijpaf@gmail.com';

send = (sender, password, message) =>
{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service: 'Gmail',
        auth: {
            user: sender,
            pass: password
        }
    });
    
    const mailOptions = {
        from: sender,
        to: receiver,
        subject: 'Module m03_PAF',
        text: message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        err ? console.log(err) : console.log('Sent: ' + info.response);
    })
}

module.exports = send;