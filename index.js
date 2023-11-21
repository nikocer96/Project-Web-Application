// app.js

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const port = 3000;
const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/submit", (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  posts.push(newPost);
  res.render("index.ejs", { posts });
});

// app.js

// ... (previous code)

app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    console.log("Post id: ", postId);
    const post = posts[postId];
    console.log("Post:", post);
    res.render("edit.ejs", { post, postId });
  });
  
  app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    posts[postId] = { title, content };
    res.redirect("/");
  });
  
  app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1);
    res.redirect("/");
  });
  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
