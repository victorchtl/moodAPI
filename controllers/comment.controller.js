const db = require("../models");
const Comment = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId) {
        res.status(400).send({
            message: "mood must have a user!"
        });
        return;
    }
    if (!req.body.message) {
        res.status(400).send({
            message: "mood can not be empty!"
        });
        return;
    }

    const comment = {
        userId: req.body.userId,
        username : req.body.username,
        userImg : req.body.userImg,
        moodId: req.body.moodId,
        message: req.body.message,
    };

    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the mood."
            });
        });
};

exports.findAll = (req, res) => {
    Comment.findAll({
        order: [
            ['createdAt', 'ESC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving moods."
            });
        });
};


exports.findByMoodId = async (req, res) => {
    try {
      const comment = await Comment.findAll({
        where: {
            moodId: req.body.moodId,
        },
        include: User,
        order: [
            ['createdAt']
        ]
      });
      return res.status(200).json({comment});
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };