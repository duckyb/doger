const express = require("express");
const cors = require("cors");
const monk = require("monk");
const Filter = require("bad-words");
const rateLimit = require("express-rate-limit");

const app = express();

const db = monk(process.env.MONGO_URI || "localhost/doger");
const posts = db.get("posts");
const filter = new Filter();

// middleware
app.use(cors()); // allow cross origin resouce sharing
app.use(express.json()); // ready for JSON data

app.get("/", (req, res) => {
  // listening request on root path
  res.json({
    welcome: "You are connected to the Doger api."
  });
});

app.get("/woofs", (req, res) => {
  posts
    .find({})
    .then(p => {
      res.json(p);
    })
    .catch(e => console.log("Error: " + e));
});

function isValidPost(p) {
  // validation
  return (
    p.usr &&
    p.usr.toString().trim() !== "" &&
    p.body &&
    p.body.toString().trim() !== "" &&
    p.title &&
    p.title.toString().trim() !== ""
  );
}

app.use(
  rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 1
  })
);

app.post("/woofs", (req, res) => {
  if (isValidPost(req.body)) {
    // insert into DB
    const woof = {
      name: filter.clean(req.body.usr.toString()),
      title: filter.clean(req.body.title.toString()),
      content: filter.clean(req.body.body.toString()),
      date: new Date().toLocaleDateString("it-IT")
    };

    console.log(woof);

    posts
      .insert(woof)
      .then(createdPost => {
        res.json(createdPost);
      })
      .catch(console.log("failed to insert into db"));
  } else {
    // return error
    res.status(422);
    res.json({
      message: "Hey! This type of post is not allowed ... Sorry!"
    });
  }
});

app.listen(5000, () => {
  console.log("listening on https://localhost:5000");
});
