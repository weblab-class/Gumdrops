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
const ProfileImage = require("./models/profile-image");
const Project = require("./models/project");
const StoryCard = require("./models/storycards");
const ProjectThumbnail = require("./models/project-thumbnail.js");
const ProfileBio = require("./models/profile-bio");
const ObjectId = require('mongodb').ObjectId; 
const Role = require('./models/role.js');

//import external libraries specific to Gumdrops
const linker = require("./linkpreview.js");
const compress = require("./compress-img.js");

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

//Updates the user document to contain an additional project. Expects an object of:
// { userId: String, projectId: String}
router.post("/user_add_project",(req,res)=>{
  var targetId = new ObjectId(req.body.userId); //have to convert to ObjectId for MongoDB's search to work
  let query = {"_id": targetId};
  User.updateOne(query,{ $push: {
    projectIds: req.body.projectId,
  }}).then(result=>res.send({})).catch(e=>console.log(e));
});

//Returns the user names of all collaborators on a project and their appropriate role styling. Expects an object of:
// { projectId: String }
//Returns an array of { userName : [roleName,userId,roleStyling] } objects.
router.get("/user-roles", async (req,res)=>{
  console.log("Going into /user-roles");
  try {
    let myProject = await Project.findById(req.query.projectId);
    //console.log(myProject);
    let outUsers= {};
    let outRoles= {};

    for(var i=0; i < myProject.collaborators.length;i++){
      let userObj =  await User.findById(myProject.collaborators[i].userId);
      let userArray = [myProject.collaborators[i].role,myProject.collaborators[i].userId]; //associate username with role & userId
      //console.log("Looking for "+myProject.collaborators[i].role);
      if(!(myProject.collaborators[i].role in outRoles)) { //role not queried before
        let roleObj = await Role.findOne({roleName: myProject.collaborators[i].role});
        userArray.push(roleObj.styling);
        outRoles[roleObj.roleName] = roleObj.styling;
      } else {
        userArray.push(outRoles[myProject.collaborators[i].role]);
      }
      outUsers["@"+userObj.name] = userArray;
    }
    //console.log(outUsers);
    res.send(outUsers);
  } catch(e) {
    console.log(e);
  }
});


//Return the Project object corresponding to a specific projectID. Expects an object of:
// { projectId: String }
router.get("/project",(req,res)=>{
  Project.findById(req.query.projectId).then((project)=>{
  res.send(project);
  });
});
  
//Stores a new Project document. Expects an object of:
// { name: String, collaborators: [{userId:String,role:String}], teamId:String}
router.post("/project",(req,res)=>{
  let newproject = new Project({
    name : req.body.name,
    collaborators: req.body.collaborators,
    teamId: req.body.teamId,
    tags: req.body.tags,
  });
  newproject.save()
    .then(result=>{
      console.log("The newly saved projectId is "+result._id);
      res.send(result._id);
    })
    .catch(error=>console.log(error));
})

//Deletes a project from the Project collection. Expects an object of:
// { projectId: String }
//Deletes corresponding Project document, Thumbnail, StoryCards, Messages, and entry in User document
router.post("/delproject",(req,res)=>{
  let projectIdObject = new ObjectId(req.body.projectId);
  Project.deleteOne({"_id":projectIdObject})
    .then((event)=>console.log("Deleted "+event.deletedCount+" project"));
  ProjectThumbnail.deleteOne({"projectId":req.body.projectId})
    .then((event)=>console.log("Deleted "+event.deletedCount+" thumbnail"));
  StoryCard.deleteMany({"projectId":req.body.projectId})
    .then((event)=>console.log("Deleted "+event.deletedCount+" storyCard(s)"));
  Message.deleteMany({"recipient._id":req.body.projectId})
    .then((event)=>console.log("Deleted "+event.deletedCount+" message(s)"));
  User.updateMany({"projectIds":req.body.projectId},{$pull:{"projectIds":req.body.projectId}})
    .then((event)=>console.log(event.nModified));
  res.send({});
});


//Retrieve all the projects associated with a specific UserId: Expects an object of:
//{ userid : String}
router.get("/projects",(req,res)=>{

  //New Method directly queries the Project collections for the right userid
  console.log("Finding projects for "+req.query.userid);
  Project.find({"collaborators.userId": req.query.userid})
    .then((outProjects)=>{
      res.send({projects: outProjects});
    })
    .catch(error=>{
      console.log(error);
    });
});

//Retrieve all the projects in the database
//Expects no input
router.get("/explore",(req,res)=> {
  Project.find({}).then((projects)=>res.send(projects));
});


//Retrieves the styling of a role in the database. Expects an object of:
// { roleName: String }
router.get("/role",(req,res)=>{
  let query = { "roleName": this.query.roleName };
  Role.find(query).then((roleObj)=>{
    res.send(roleObj);
  });
});

//Creates a new Role entry in the database. Expects an object of:
// { roleName: String, styling: Object } 
//The styling Object should be a satisfable for React CSS "style" attribute.
router.post("/role",(req,res)=>{
  let newrole = new Role(req.body);
  newrole.save();
});

//Retrieve all story cards corresponding to a specific projectId. Expects an object of:
// { projectId: String }
router.get("/storycards",(req,res)=>{
  let query = { "projectId" : req.query.projectId };
  StoryCard.find(query).then((storyCards)=>{
    res.send(storyCards);
  })
});

//Creates a new StoryCard document. Expects an object with at least:
// {  projectId: String, textTitle: String, textContent: String} and optional parameters
// { links: [String], videoMedia: String, imageMedia: Buffer }
//Note: This is enforced in storyCard.js!
router.post("/storycards",(req,res)=>{
  const storycard = new StoryCard(req.body);
  storycard.save().then((storycard)=>res.send(storycard));
});

//Deletes all StoryCards document that matches the body. 
//Sends back an object { deletedCount: #of objects deleted }
router.post("/delstorycard",(req,res)=>{
  
  StoryCard.deleteOne(req.body).then((result) => {
    console.log("Delete story card operation was completed");
    console.log(result.deletedCount);
    res.send({deletedCount: result.deletedCount});
  }).catch((err)=>console.log(err));
});

router.post("/editstorycard",(req,res)=>{
  console.log("Trying edit storycard with id "+req.body._id);
  let filter = {"_id" : new ObjectId(req.body._id)};
  console.log(filter);
  console.log(req.body.changes);
  //console.log(req.body.changes);
  if(req.body.changes.imageMedia){
    let urlArray = req.body.changes.imageMedia.split(',');
    let buffer = Buffer.from(urlArray[1], 'base64');
    compress.tryImgCompress(buffer).then((smolImg)=>{
      console.log("operation completed");
      console.log(smolImg);
      StoryCard.updateOne(filter,{"imageMedia":smolImg,"imageHeader":urlArray[0]}).then((result)=>{
        res.send(result);
        }).catch((err)=>console.log("there was an errorr alarm"));
    });
  } else {
  StoryCard.updateOne(filter,{$set: {textContent: req.body.changes}}).then((result)=>{
    res.send(result);
    }).catch((err)=>console.log("there was an errorr alarm"));
  }
});

router.get("/story-image",(req,res)=>{
  //console.log("Finding story with id: "+req.query._id);
  StoryCard.findOne({"_id" : req.query._id}).then((storyCard)=>{
    // console.log("Sending image: "+storyCard.imageMedia);
    if((storyCard.imageMedia !== null) && storyCard.imageMedia){
      let unbufferedImg;
      if(storyCard.imageHeader && storyCard.imageHeader!=="") {
        unbufferedImg = storyCard.imageHeader + "," + storyCard.imageMedia.toString('base64'); //recreate URL-encoded image
      } else {
        unbufferedImg = storyCard.imageMedia.toString(); //for backwards compatibility with earlier images
      }
      //console.log("Recovered image string "+unbufferedImg.substr(0,200));
      res.send({image:unbufferedImg});
    }
  }).catch((err)=>console.log("there was an errorr alarm"+err));
});

router.get("/chat", (req, res) => {
  console.log(req.query);
  Message.find(req.query).then((messages)=>res.send(messages));
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

//Delete a message from the database. Expects and object with:
//{message: Object, recipient_id: String}
router.post("/deleteMessage", (req, res) => {
  let collaborators = [];
  Project.findById(req.body.recipient_id).then((projectObj)=>{
    projectObj.collaborators.forEach((element) => {
      collaborators.push(element.userId);
      let socketObj = socketManager.getSocketFromUserID(element.userId);
      if(socketObj){ //if user is connected
        socketObj.emit("deletedMessage",req.body.message);
      }
    });
  })
  .then(Message.deleteOne({"_id": `${req.body.message._id}`})).catch((err)=>console.log(err));
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});

//Post an image to the database. Expects an object with:
//{ userId: String, image: String (need to be in base64!), }
router.post("/image",(req,res)=>{
  let prevImage = ProfileImage.findOne({"userId": req.body.userId}).then(()=>console.log("Found prevImage: "+prevImage));
  if (prevImage) {
    ProfileImage.deleteOne({"userId": req.body.userId}).then(()=>console.log("Deleted Image: "+prevImage.userId+" "+prevImage.image));
  }
  console.log("Received save profile image request");
  let bufferedImg = Buffer.from(req.body.image);
  const image = new ProfileImage({
    userId: req.body.userId,
    image: bufferedImg,
  });
  image.save().then(()=>console.log("Profile image saved successfully."));
  socketManager.getSocketFromUserID(req.body.userId).emit("profile-image", image);
});

//Get an image from the database. Expects an object with one or more of the following fields:
//{ userId: String }
router.get("/image",(req,res)=>{
  console.log("Received get profile image request");
  //console.log("Trying to match image with id "+req.query.userId);
  ProfileImage.findOne({"userId": req.query.userId})
    .then((returnImage)=> {
      let unbufferedImg = returnImage.image.toString();
      //console.log("Recovered image string "+unbufferedImg.substr(0,200));
      res.send({
        image: unbufferedImg
      });
    })
    .catch((err)=>console.log(err));
});

//Get a user's profile bio information from the database. Expects an object with following field:
//{ userId: String }
router.get("/profile-bio", (req,res)=>{
  ProfileBio.findOne({"userId" : req.query.userId}).then((bio)=>res.send(bio))
  .catch((err)=>console.log(err));
});

//Post a user bio to the database. Expects an object with following field:
//{ userId: String, content: String }
router.post("/profile-bio",(req,res)=>{
  const prevBio = ProfileBio.findOne({"userId": req.body.userId}).then(()=>console.log("Found prevBio: "+prevBio));
  if (prevBio) {
    ProfileBio.deleteOne({"userId": req.body.userId}).then(()=>console.log("Deleted Bio: "+prevBio.userId+" "+prevBio.content));
  }
  const bio = new ProfileBio({
    userId: req.body.userId,
    content: req.body.content,
  });
  bio.save().then(()=>console.log("Profile bio saved successfully: "+bio.content));
  socketManager.getSocketFromUserID(req.body.userId).emit("profile-bio", bio);
});

//Get a project thumbnail image from the database. Expects an object with following field:
//{ projectId: String }
router.get("/thumbnail",(req,res)=>{
  ProjectThumbnail.findOne(req.query)
    .then((returnImage)=> {
      if(returnImage){ //if not null
      let unbufferedImg;
      if(returnImage.imageHeader) {
        unbufferedImg = returnImage.imageHeader + "," + returnImage.image.toString('base64'); //recreate URL-encoded image
      } else {
        unbufferedImg = returnImage.image.toString(); //for backwards compatibility with earlier images
      }
      //console.log("Recovered image string "+unbufferedImg.substr(0,200));
      res.send({
        image: unbufferedImg
      });
      } else {
        res.status(200).send({});
      }
    })
    .catch((err)=>console.log(err));
});

//Post a thumbnail to the database. Expects an object with:
//{ projectId: String, image: String (need to be in base64!), imageName : String }
router.post("/thumbnail",(req,res)=>{
  console.log("Received save thumbnail request");
  let urlArray = req.body.image.split(',');
  let buffer = Buffer.from(urlArray[1], 'base64');
  compress.tryImgCompress(buffer).then((smolImg)=>{
    console.log("operation completed");
    const image = new ProjectThumbnail({
      projectId: req.body.projectId,
      image: smolImg,
      imageName: req.body.imageName,
      imageHeader: urlArray[0], 
    });
    image.save().then(()=>{
      console.log("Thumbnail saved successfully.");
      res.send({});
    });
  });

});

//Check if a user is a collaborator in a project. Expects an object with the following fields:
//{ userId: String, projectId: String }
router.get("/isUserCollaborator", (req,res)=>{
  let canEdit = false;
  Project.findById(req.query.projectId)
    .then((projectObj)=>{
      projectObj.collaborators.forEach((collaber)=>{
        if(collaber.userId===req.query.userId) {
          canEdit = true;
        }
      });
      res.send(canEdit);
    })
    .catch((err)=>console.log(err));
});

//Retrieves information about an array of URL links (e.g. "https://www.google.com") Expects an object of:
//{ links: [String] }
//Note: We have to use POST to send an array to back-end
router.post("/link", (req,res) => {
  linker.tryLinkPreview(req.body.links).then(result=>res.send(result));
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
