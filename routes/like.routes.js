module.exports = app => {
    const likes = require("../controllers/like.controller.js");
    var router = require("express").Router();

    router.post("/", likes.createLike);
    router.get("/topMoods", likes.findTopMoods);
    router.get("/", likes.findAll);
    router.post("/findByUserId", likes.findByUserId);
    router.post("/findByMoodId", likes.findByMoodId);
    router.post("/findByUserAndMoodId", likes.findByUserAndMoodId);
    router.get("/:id", likes.findOne);
    router.put("/dislike", likes.createDislike);
    router.put("/updateLike", likes.updateLike);

    app.use('/api/likes', router);
  };