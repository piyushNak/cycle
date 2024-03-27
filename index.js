const express = require('express');

const port = 8002;
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const cycles = require('./data/data.json');

app.set('view engine',"ejs");
app.set('views',path.join(__dirname,"views"));
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));
app.get("/", (req,res)=>{
    console.log(cycles);
    return res.render('bicycle',{
        cycles
    });
});

app.get("/bicycle", (req,res)=>{
    let singleCycle = cycles.find((b=>b.id==req.query.id));
    return res.render("overview",{
        singleCycle
    });
})

app.get("/about", (req,res)=>{
    res.status(200).json({msg:"hi"});
});



app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is running port:",port);
})