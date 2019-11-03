const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail')
const Users = require('./config/config.js');


//Create Express APp Ojbect
const app = express();



//This load all the static asssets in the public folder, such include css file, images, js file(s)
app.use(express.static('public'))


//This tells Express that I want to use handlebars as my TEMPLATING ENGINE!!!!!!!!!!
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// This tells Express to parse all submitted form data into the body of the request object
app.use(bodyParser.urlencoded({ extended: false }))


//This code is used to connect mongoose to our MONGODB in the Cloud
const DBURL = "mongodb+srv://baonguyen:Giabaodn.2291999@cluster0-uubnr.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DBURL, { useNewUrlParser: true })
    //The then block will only be executed if the above-mentioned line is successful
    .then(() => {
        console.log(`Database is connected`)
    })
    //The catch block will only be executed if the connection failed
    .catch(err => {
        console.log(`Something went wrong : ${err}`);
    })


app.get("/", (req, res) => {

    res.render("home");
});

app.get("/registration", (req, res) => {

    res.render("registration");
});

const regexp=/^[a-zA-Z0-9]{6,12}$/;

app.post("/registration", (req, res)=>{
    const errors = [];
    if (req.body.email == "") {
        errors.push("Please enter your email");
    }
    if (req.body.first_name == "") {
        errors.push("Please enter your first name");
    }
    if (req.body.last_name == "") {
        errors.push("Please enter your last name");
    }
    if (req.body.pwd == "") {
        errors.push("Please enter your passwords");
    }
     if(regexp.test(req.body.pwd) == false){
        errors.push("Please enter a password that is 6 to 12 characters and the password must have letters and numbers only");
     }
    if (req.body.dob == "") {
        errors.push("Please enter your date of birth");
    }
    if (errors.length > 0) {

        res.render("registration",
            {
                message: errors
            })
    } else {

        const userInfo = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            pwd: req.body.pwd,
            dob: req.body.dob
        }

        //Create user by calling user model constructor
        let user = new Users(userInfo);
        user.save()
            .then(() => {
                console.log('User was inserted into database')
            })
            .catch((err) => {
                console.log(`User was not inserted into the database because ${err}`)
            })
        //send email

        sgMail.setApiKey("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")
        const msg = {
            to: `${req.body.email}`,
            from: 'pgbnguyen@gmail.com',
            subject: 'Confirmation Email',
            text: 'This is a confirmation email',
            html: '<strong>Congratulation, Welcome to Airbnb</strong>',
        };
        sgMail.send(msg)
        .then(result=>{
            console.log(`Email is sent! Result is: ${result}`);
        })
        .catch(err=>{
            console.log(`Occerd an error: ${err}`)
        })
        res.redirect("/registration");
    }


});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {

    const errors = [];
    if (req.body.email == "") {
        errors.push("Please enter your email");
    }

    if (errors.length > 0) {

        res.render("login",
            {
                message: errors
            })
    }

});


app.get("/room-list", (req, res) => {
    res.render("room-list");
});
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Connected Successfully to PORT: ${PORT}`);
});