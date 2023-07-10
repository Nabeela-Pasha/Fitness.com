const express = require("express");
const path=require("path");
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/nabbu');
  console.log("we are connected to gym website!");
}


const gym = express();
const port = 3000;

const GymSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    email: String,
    phone: String
  });

const Gym = mongoose.model('GymWebsite', GymSchema);


//for serving static files:
gym.use('/static',express.static('static'));
gym.use(express.urlencoded())
//set the template engine as pug:
gym.set('view engine','pug');

//set views directory
gym.set('views',path.join(__dirname,'views'));
//our pug demo endpoint
gym.get("/", (req, res)=>{ 
    const params={'title':'pubg is the best game'}
    res.status(200).render('index',params)
})

gym.post("/",(req,res)=>{
    var Data=new Gym(req.body);
    Data.save().then(()=>{
        res.send("This Entry has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Entry could not be added to the database")
    })
})

gym.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
