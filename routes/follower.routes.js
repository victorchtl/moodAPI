module.exports = app => {
    const followers = require("../controllers/follower.controller.js");
    var router = require("express").Router();

    router.post("/follow", followers.follow);
    router.post("/unfollow", followers.unfollow);
    router.post("/findByUser", followers.findByUser);
    router.post("/findByFollowing", followers.findByFollowing);
    router.post("/countFollowing", followers.countFollowing);
    router.post("/countFollowers", followers.countFollowers);

    app.use('/api/followers', router);
  };