const express= require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


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
const DBURL= "mongodb+srv://baonguyen:Giabaodn.2291999@baonguyen-7dzcy.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DBURL, {useNewUrlParser: true})
//The then block will only be executed if the above-mentioned line is successful
.then(()=>{
    console.log(`Database is connected`)
})
//The catch block will only be executed if the connection failed
.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})


app.get("/", (req, res) => {
    
    res.render("home");
});

app.get("/registration", (req, res)=>{
    
    res.render("registration");
});

app.post("/registration", (req, res)=>{
    
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
      email:  String,
      first_name: String,
      last_name: String,
      pwd: String,
      dob: Date
    });

    //Create modle named user representing user's collection in the database
    const users = mongoose.model('users', userSchema);

    const userInfo = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        pwd: req.body.pwd,
        dob: req.body.dob
    }

    //Create user by calling user model constructor
    const user = new users(userInfo);
    user.save()
    .then(() => 
    {
        console.log('User was inserted into database')
    })
    .catch((err)=>{
        console.log(`User was not inserted into the database because ${err}`)
    })
    res.redirect("/");
   
});   
app.get("/room-list", (req, res)=>{
    res.render("room-list");
});
PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Connected Successfully to PORT: ${PORT}`);
});