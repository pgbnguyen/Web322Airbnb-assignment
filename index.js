const express= require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');



//Create Express APp Ojbect
const app = express();



//This load all the static asssets in the public folder, such include css file, images, js file(s)
app.use(express.static('public'))


//This tells Express that I want to use handlebars as my TEMPLATING ENGINE!!!!!!!!!!
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// This tells Express to parse all submitted form data into the body of the request object
app.use(bodyParser.urlencoded({ extended: false }))




app.get("/", (req, res) => {
    
    res.render("home");
});

app.get("/registration", (req, res)=>{
    
    res.render("registration");
});


app.get("/room-list", (req, res)=>{
    res.render("room-list");
});
PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Connected Successfully to PORT: ${PORT}`);
});