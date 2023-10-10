
//we use html-pdf for pdf
const pdf = require('html-pdf')
const path = require('path')
const nodemailer = require('nodemailer')
const fs = require('fs')
const pdfTemplate = require("./documents/document")
const env = require('dotenv')
env.config()


exports.createPdf = (req,res)=>{

    pdf.create(pdfTemplate(req.body),{}).toFile('invoice.pdf',(err)=>{
        if(err){
            console.log(err);
        }
        res.send('pdf generated')
    })
}

exports.fetchPdf = (req,res)=>{
    res.sendFile(path.join(__dirname, 'invoice.pdf'))
}

exports.sendPdf = (req,res)=>{

    pathToAttachment = path.join(__dirname, 'invoice.pdf')
    attachment = fs.readFileSync(pathToAttachment).toString("base64")

    let smtpTransport = nodemailer.createTransport({
        host:'mail.jeffgalvez42@gmail.com',
        service:'Gmail',
        port:465, 
        secure:true,
        auth:{
            user: 'jeffgalvez42@gmail.com',
            pass: 'bdnf vbld rejp dxuc'
            // user:process.env.USER,
            // pass:process.env.PASSWORD
        },
        // tls:{rejectUnauthorized:false}
    })

    smtpTransport.sendMail({
            from: 'jeffgalvez42 <jeffgalvez42@gmail.com>',
            // to: 'test2@openjavascript.info',
        // from:process.env.EMAIL,
        to:req.body.email,
        subject:'Pdf Generate document',
        html:`
        Testing Pdf Generate document, Thanks.`,
        attachments:[
            {
                content:attachment,
                filename:'invoice.pdf',
                contentType: 'application/pdf',
                path:pathToAttachment
            }
        ]
    },function(error,info){

        if(error){
            res.send(error)
            console.log(error);
        }
        else{
            res.send("Mail has been sended to your email. Check your mail")
        }
       
    })


}