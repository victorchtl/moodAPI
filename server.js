const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

const randomColor = require('./assets/RandomColor');
const bcrypt = require("bcryptjs");

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.use(
  cookieSession({
    name: "mood-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mood application." });
  console.log(process.env.ACCESS_TOKEN_SECRET)
});

const db = require("./models");
const Role = db.role;
const User = db.users;
const Follower = db.followers;
const Mood = db.moods;
const Comment = db.comments;
const Like = db.likes;
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });
db.sequelize.sync();
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
  User.bulkCreate([
    { email: 'victor@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'victor', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'rihanna@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'rihanna', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'batman@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'batman', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'depardieu@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'depardieu', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'kirikou@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'kirikou', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'francis@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'francis', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'buddha@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'buddha', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'sigourney@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'sigourney', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'jarjarbinks@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'jarjarbinks', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color },
    { email: 'trinity@gmail.com', password: bcrypt.hashSync("123soleil", 8), username: 'trinity', profilImg: randomColor[Math.floor(Math.random() * randomColor.length)].color }
  ]);
  Follower.bulkCreate([
    { userId: 1, followingId: 2},
    { userId: 1, followingId: 3},
    { userId: 1, followingId: 4},
    { userId: 1, followingId: 5},
    { userId: 1, followingId: 6},
    { userId: 1, followingId: 7},
    { userId: 1, followingId: 8},
    { userId: 1, followingId: 9},
    { userId: 1, followingId: 10},
    { userId: 2, followingId: 4},
    { userId: 2, followingId: 6},
    { userId: 2, followingId: 8},
    { userId: 2, followingId: 10},
    { userId: 3, followingId: 2},
    { userId: 3, followingId: 4},
    { userId: 3, followingId: 5},
    { userId: 3, followingId: 7},
    { userId: 3, followingId: 9},
    { userId: 4, followingId: 2},
    { userId: 4, followingId: 5},
    { userId: 4, followingId: 6},
    { userId: 4, followingId: 7},
    { userId: 4, followingId: 9},
    { userId: 5, followingId: 2},
    { userId: 5, followingId: 4},
    { userId: 5, followingId: 6},
    { userId: 5, followingId: 7},
    { userId: 5, followingId: 9},
    { userId: 6, followingId: 1},
    { userId: 6, followingId: 4},
    { userId: 6, followingId: 5},
    { userId: 6, followingId: 7},
    { userId: 6, followingId: 9},
    { userId: 7, followingId: 1},
    { userId: 7, followingId: 4},
    { userId: 7, followingId: 5},
    { userId: 7, followingId: 8},
    { userId: 7, followingId: 9},
    { userId: 8, followingId: 1},
    { userId: 8, followingId: 4},
    { userId: 8, followingId: 5},
    { userId: 8, followingId: 7},
    { userId: 8, followingId: 9},
    { userId: 9, followingId: 1},
    { userId: 9, followingId: 4},
    { userId: 9, followingId: 5},
    { userId: 9, followingId: 7},
    { userId: 9, followingId: 8},
    { userId: 10, followingId: 1},
    { userId: 10, followingId: 4},
    { userId: 10, followingId: 5},
    { userId: 10, followingId: 7},
    { userId: 10, followingId: 8}
  ]);
  Mood.bulkCreate([
    { userId: 1, message: 'coucou ceci est mon premier mood!' },
    { userId: 1, message: 'coucou ceci est mon second mood!' },
    { userId: 1, message: 'coucou ceci est mon troisième mood!' },
    { userId: 1, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 1, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 2, message: 'coucou ceci est mon premier mood!' },
    { userId: 2, message: 'coucou ceci est mon second mood!' },
    { userId: 2, message: 'coucou ceci est mon troisième mood!' },
    { userId: 2, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 2, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 3, message: 'coucou ceci est mon premier mood!' },
    { userId: 3, message: 'coucou ceci est mon second mood!' },
    { userId: 3, message: 'coucou ceci est mon troisième mood!' },
    { userId: 3, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 3, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 4, message: 'coucou ceci est mon premier mood!' },
    { userId: 4, message: 'coucou ceci est mon second mood!' },
    { userId: 4, message: 'coucou ceci est mon troisième mood!' },
    { userId: 4, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 4, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 5, message: 'coucou ceci est mon premier mood!' },
    { userId: 5, message: 'coucou ceci est mon second mood!' },
    { userId: 5, message: 'coucou ceci est mon troisième mood!' },
    { userId: 5, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 5, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 6, message: 'coucou ceci est mon premier mood!' },
    { userId: 6, message: 'coucou ceci est mon second mood!' },
    { userId: 6, message: 'coucou ceci est mon troisième mood!' },
    { userId: 6, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 6, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 7, message: 'coucou ceci est mon premier mood!' },
    { userId: 7, message: 'coucou ceci est mon second mood!' },
    { userId: 7, message: 'coucou ceci est mon troisième mood!' },
    { userId: 7, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 7, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 8, message: 'coucou ceci est mon premier mood!' },
    { userId: 8, message: 'coucou ceci est mon second mood!' },
    { userId: 8, message: 'coucou ceci est mon troisième mood!' },
    { userId: 8, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 8, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 9, message: 'coucou ceci est mon premier mood!' },
    { userId: 9, message: 'coucou ceci est mon second mood!' },
    { userId: 9, message: 'coucou ceci est mon troisième mood!' },
    { userId: 9, message: 'coucou ceci est mon cinquième mood!' },
    { userId: 9, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 10, message: 'coucou ceci est mon second mood!' },
    { userId: 10, message: 'coucou ceci est mon premier mood!' },
    { userId: 10, message: 'coucou ceci est mon quatrième mood!' },
    { userId: 10, message: 'coucou ceci est mon troisième mood!' },
    { userId: 10, message: 'coucou ceci est mon cinquième mood!' },
  ]);
  Comment.bulkCreate([
    { userId: 10, moodId: 1, message: "ceci est un commentaire"},
    { userId: 6, moodId: 1, message: "ceci est un commentaire"},
    { userId: 4, moodId: 1, message: "ceci est un commentaire"},
    { userId: 8, moodId: 8, message: "ceci est un commentaire"},
    { userId: 2, moodId: 8, message: "ceci est un commentaire"},
    { userId: 3, moodId: 8, message: "ceci est un commentaire"},
    { userId: 2, moodId: 15, message: "ceci est un commentaire"},
    { userId: 5, moodId: 15, message: "ceci est un commentaire"},
    { userId: 8, moodId: 15, message: "ceci est un commentaire"},
    { userId: 2, moodId: 22, message: "ceci est un commentaire"},
    { userId: 5, moodId: 22, message: "ceci est un commentaire"},
    { userId: 8, moodId: 22, message: "ceci est un commentaire"},
    { userId: 10, moodId: 30, message: "ceci est un commentaire"},
    { userId: 6, moodId: 30, message: "ceci est un commentaire"},
    { userId: 4, moodId: 30, message: "ceci est un commentaire"},
    { userId: 8, moodId: 35, message: "ceci est un commentaire"},
    { userId: 2, moodId: 35, message: "ceci est un commentaire"},
    { userId: 3, moodId: 35, message: "ceci est un commentaire"},
    { userId: 2, moodId: 40, message: "ceci est un commentaire"},
    { userId: 5, moodId: 40, message: "ceci est un commentaire"},
    { userId: 8, moodId: 40, message: "ceci est un commentaire"},
    { userId: 2, moodId: 42, message: "ceci est un commentaire"},
    { userId: 5, moodId: 42, message: "ceci est un commentaire"},
    { userId: 8, moodId: 42, message: "ceci est un commentaire"},
  ]);
}
require('./routes/auth.routes')(app);
require("./routes/user.routes")(app);
require("./routes/mood.routes")(app);
require("./routes/comment.routes")(app);
require("./routes/like.routes")(app);
require("./routes/follower.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// initial();