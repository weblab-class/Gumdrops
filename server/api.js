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
const ProjectThumbnail = require("./models/project-thumbnail.js");
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

//Return the Project object corresponding to a specific projectID. Expects an object of:
// { projectId: String }
router.get("/project",(req,res)=>{
  Project.findById(req.query.projectId).then((project)=>{
  res.send(project);
  });
});
  
//Retrieve all the projects associated with a specific UserId: Expects an object of:
//{ userid : String}
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
        console.log("Found project "+project.name+"\n");
      }
      res.send({projects:outProjects});
    } catch(e) {
      res.status(400).json({message:e.message});
    }
  });
});

//Retrieve all the projects in the database
//Expects no input
router.get("/explore",(req,res)=> {
  Project.find().then((projects)=>res.send(projects))
});

//Retrieve all story cards corresponding to a specific projectId. Expects an object of:
// { projectId: String }
router.get("/storycards",(req,res)=>{
  console.log("Passed in projectId "+req.query.projectId);
  let query = { "projectId" : req.query.projectId };
  StoryCard.find(query).then((storyCards)=>{
    console.log(storyCards);
    res.send(storyCards);
  })
});

//Creates a new StoryCard document. Expects an object with at least:
// {  projectId: String, textTitle: String, textContent: String} and optional parameters
// { links: [String], videoMedia: String, imageMedia: Buffer }
//Note: This is enforced in storyCard.js!
router.post("/storycards",(req,res)=>{
  const storycard = new StoryCard(req.body);
  storycard.save();
})

//Deletes all StoryCards document that matches the body. 
//Sends back an object { deletedCount: #of objects deleted }
router.post("/delstorycard",(req,res)=>{
  StoryCard.deleteOne(req.body).then((result) => {
    console.log("Delete story card operation was completed");
    console.log(result.deletedCount);
    res.send({deletedCount: result.deletedCount});
  }).catch((err)=>console.log(err));
})


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
  
  let collaborators = [];

  Project.findById(req.body.recipient._id).then((projectObj)=>{
    console.log("I retrieved the project you wanted");
    console.log(projectObj.collaborators);
    projectObj.collaborators.forEach(element => {
      collaborators.push(element.userId);
      let socketObj = socketManager.getSocketFromUserID(element.userId);
      if(socketObj){ //if user is connected
        socketObj.emit("message",message);
      }
    });
    console.log(collaborators);
  });
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
  Image.findOne(req.query) //Uses the req.query as the content body
    .then((returnImage)=> {
      let unbufferedImg = returnImage.image.toString();
      console.log("Recovered image string "+unbufferedImg.substr(0,200));
      res.send({
        image: unbufferedImg
      });
    })
    .catch((err)=>console.log(err));
});

//Get a project thumbnail image from the database. Expects an object with following field:
//{ projectId: String }
router.get("/thumbnail",(req,res)=>{
  console.log("Received get thumbnail request");
  console.log("Trying to match thumbnail with id "+req.query.projectId);
  ProjectThumbnail.findOne(req.query)
    .then((returnImage)=> {
      let unbufferedImg = returnImage.image.toString();
      console.log("Recovered thumbnail string "+unbufferedImg.substr(0,200));
      res.send({
        image: unbufferedImg
      });
    })
    .catch((err)=>console.log(err));
});

//Post a thumbnail to the database. Expects an object with:
//{ projectId: String, image: String (need to be in base64!), imageName : String }

router.post("/thumbnail",(req,res)=>{
  console.log("Received save thumbnail request");
  let bufferedImg = Buffer.from(req.body.image);
  const image = new ProjectThumbnail({
    projectId: req.body.projectId,
    image: bufferedImg,
    imageName: req.body.imageName,
  });
  image.save().then(()=>console.log("Thumbnail saved successfully."));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
