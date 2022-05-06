const { authJwt } = require("../middleware");
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/", users.create);
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    router.post("/findByFollowing", users.findByFollowing);
    router.post("/findByFollowers", users.findByFollowers);
    router.get("/all", users.allAccess);
    router.get("/user",[authJwt.verifyToken],users.userBoard);
    router.get("/mod",[authJwt.verifyToken, authJwt.isModerator],users.moderatorBoard);
    router.get("/admin",[authJwt.verifyToken, authJwt.isAdmin],users.adminBoard);

    app.use('/api/users', router);
  };
