module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();

    router.post("/", comments.create);
    router.get("/", comments.findAll);
    router.post("/byMoodId", comments.findByMoodId);
    router.get("/:id", comments.findOne);


    app.use('/api/comments', router);
  };