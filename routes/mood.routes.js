module.exports = app => {
  const moods = require("../controllers/mood.controller.js");
  var router = require("express").Router();

  router.post("/", moods.create);
  router.post("/findByUserId", moods.findByUserId);
  router.get("/", moods.findAll);
  router.post("/findByFollowing", moods.findByFollowing);
  router.post("/countMoods", moods.countMoods);

  app.use('/api/moods', router);
};