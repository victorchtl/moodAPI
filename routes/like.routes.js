module.exports = app => {
    const likes = require("../controllers/like.controller.js");
    var router = require("express").Router();

    router.post("/", likes.createLike);
    router.get("/topMoods", likes.findTopMoods);
    router.get("/", likes.findAll);
    router.post("/findByUserAndMoodId", likes.findByUserAndMoodId);
    router.put("/dislike", likes.createDislike);

    app.use('/api/likes', router);
  };