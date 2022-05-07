module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();

    router.post("/", comments.create);
    router.get("/", comments.findAll);
    router.post("/byMoodId", comments.findByMoodId);


    app.use('/api/comments', router);
  };