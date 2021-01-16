/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Message = require("./models/message");
const Image = require("./models/image");
const Project = require("./models/project");
const StoryCard = require("./models/storycards");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/projects",(req,res)=>{

  User.findById(req.query.userid).then( async (user)=>
  {
    try{
      let arrayLength = user.projectIds.length;
      let outProjects = [];
      for (var i = 0; i < arrayLength; i++) {
        console.log("User is in "+user.projectIds[i]+'\n');
        let project = await Project.findById(user.projectIds[i]);
        outProjects.push(project);
        console.log("Found project "+project+"\n");
      }
      res.send({projects:outProjects});
    } catch(e) {
      res.status(400).json({message:e.message});
    }
  });
});

router.get("/chat", (req, res) => {
  console.log(req.query);
  Message.find(req.query).then((messages)=>res.send(messages));
  /*
  //Original version of get /chat
  let query;
  if (req.query.recipient_id === "ALL_CHAT") {
    // get any message sent by anybody to ALL_CHAT
    query = { "recipient._id": "ALL_CHAT" };
  } else {
    // get messages that are from me->you OR you->me
    query = {
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
        { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
      ],
    };
  }

  Message.find(query).then((messages) => res.send(messages));*/
});

router.post("/message", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // insert this message into the database
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  });
  message.save();

  if (req.body.recipient._id == "ALL_CHAT") {
    socketManager.getIo().emit("message", message);
  } else {
    socketManager.getSocketFromUserID(req.body.recipient._id).emit("message", message);
    if(req.user._id !== req.body.recipient._id) socketManager.getSocketFromUserID(req.user._id).emit("message", message);
  }
});


// ATTEMPT AT DELETE BUTTON
// router.post("/deleteMessage", (req, res) => {
//   Message.deleteOne({"userId": `${req.user._id}`})
// })

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});

//Post an image to the database. Expects an object with:
//{ projectId: String, cardId: String, image: String (need to be in base64!), imageName : String }

router.post("/image",(req,res)=>{
  console.log("Received save image request");
  let bufferedImg = Buffer.from(req.body.image);
  const image = new Image({
    projectId: req.body.projectId,
    cardId : req.body.cardId,
    image: bufferedImg,
    imageName: req.body.imageName,
  });
  
});

//Get an image from the database. Expects an object with one or more of the following fields:
//{ projectId: String, cardId: String, imageName: String}
router.get("/image",(req,res)=>{
  console.log("Received get image request");
  Image.findOne(req.content) //Uses the req.content as the query body
    .then((returnImage)=> {
      let unbufferedImg = returnImage.image.toString();
      console.log("Recovered image string "+unbufferedImg.substr(0,200));
      res.send({
        image: unbufferedImg
      });
    })
    .catch((err)=>console.log(err));
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
