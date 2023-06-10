const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const Place = require("./Models/place");

var secret = "secret-key";
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to database");
});

const auserSchema = mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("user", auserSchema);

// app.post('/register',async(req,res)=>{

//     const {email,firstName,password} = req.body
//     //console.log(req.body,'body')
//     const user = new userModel({
//         firstName:firstName,
//         email:email,
//         password:password,
//         as:'as'
//     })
//     var asd = await user.save()
//     console.log(asd)
// })

app.post("/register", async (req, res) => {
  const { email, firstName, password } = req.body;
  if (!email) {
    return;
  }
  var result = await userModel.findOne({ email: email });
  if (result) {
    res.send({ message: "Email id is already register", alert: false });
  } else {
    var newUser = new userModel({
      email: email,
      firstname: firstName,
      password: password,
    });
    await newUser.save();

    res.send({ message: "Successfully sign up", alert: true });
  }
});

app.post("/login", async (req, res) => {
  //console.log(req.body,'login');
  const { email } = req.body;
  var result = await userModel.findOne({ email: email });
  if (result) {
    var token = jwt.sign({ email, id: result._id }, secret);
    const dataSend = {
      _id: result._id,
      firstName: result.firstName,
      email: result.email,
      token: token,
    };
    res.send({
      message: "Login is successfully",
      alert: true,
      data: dataSend,
    });
  } else {
    res.send({
      message: "Email is not available, please sign up",
      alert: false,
    });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var atok = jwt.verify(token, secret);
    res.send({
      message: "Profile is successfully",
      alert: true,
      data: atok,
    });
  } catch (e) {
    // console.log(e)
  }
});
  
app.post("/places", async (req, res) => {
  //console.log(req.body);
  var newPlace = new Place({
    title: req.body.title,
    address: req.body.address,
    photos: req.body.addedPhotos,
    description: req.body.description,
    perks: req.body.perks,
    extraInfo: req.body.extraInfo,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    maxGuests: req.body.maxGuests,
    price: req.body.price,

  });
  await newPlace.save();

  // console.log(newPlace,'jok')
  res.send({ message: "Successfully added place", alert: true }); 
});

app.get('/allPlaces',async (req,res)=>{
try {
  const data =await Place.find({})
  //console.log(data,'1data')
  res.send({data:data,alert:true})
} catch (error) {
  console.log(error,'error in allplaces')
}
  

})

app.get('/places/:id',async(req,res)=>{ 
  try {
    const data = await Place.findOne({_id:req.params.id}) 
  //console.log(data,'data')
  res.send({data:data,alert:true})
  } catch (error) {
    console.log(error,"err in places")
  }
  
})

app.put('/places/:id',async(req,res)=>{ 
  //console.log(req.body)
  // const reqdata =req.body
  // var tit = reqdata.title
  const data = await Place.findOneAndUpdate({_id:req.params.id},{
    title: req.body.title,
    address: req.body.address,
    photos: req.body.addedPhotos,
    description: req.body.description,
    perks: req.body.perks,
    extraInfo: req.body.extraInfo,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    maxGuests: req.body.maxGuests,
    price: req.body.price, 
  })
  // console.log(data,'data') 
  res.send({data:data,alert:true})
})

app.listen(3000, () => {
  console.log("server ruuning on 3000");
});
