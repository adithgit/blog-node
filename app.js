//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const lodash = require('lodash');
const homeStartingContent = "Hey, This is a blog wesbite . You can add a blog by just adding /compose to the url of the website. This is completely free and you can do whatever you want with the blog , just dont post anything that's inappropriate as this site is not monitored and i just made it for fun. Thank You . ";
const aboutContent = "There is nothing special about this page. I had to add something so here's some Lorem Ipsum . Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "You can contact me on touristm7@gmail.com . Ping me if you have cool ideas or something. ";
const app = express();
const posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/blog');

const postSchema = new mongoose.Schema({
  postTitle : String,
  postData : String
})

const post = mongoose.model('post',postSchema)

app.get('/',(req,res)=>{
  post.find({}, (err,result)=>{ 
    res.render('home',{homeStartingContent , posts : result})
  })
});

app.get('/about',(req,res)=>{
  res.render('about',{aboutContent})
});

app.get('/contact',(req,res)=>{
  res.render('contact',{contactContent})
});

app.get('/compose',(req,res)=>{
  res.render('compose')
})

app.post('/compose',(req,res)=>{
  
  const postTitle = req.body.postTitle;
  const postBody = req.body.postData;

  const newPost = new post({
    postTitle : postTitle,
    postData : postBody
  })

  newPost.save();

  res.redirect('/')
})

app.get('/posts/:value',(req,res)=>{

  const postId =  req.params.value ;

  post.findOne({ _id : postId}, (err,result)=>{
    
    res.render('post',{post : result || {postTitle:'No Such Posts', postData:'Check your request again'}})
    
  })

  
})

app.listen(process.env.PORT ||3000, function() {
  console.log("Server started on port 3000");
});
