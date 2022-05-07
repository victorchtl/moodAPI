const db = require("../models");
const User = db.users;
const Mood = db.moods;
const Following = db.followers;
const Comment = db.comments;
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
  // Create a Tutorial
  const mood = {
    userId: req.body.userId,
    message: req.body.message
  };
  // Save Tutorial in the database
  Mood.create(mood)
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
  Mood.findAll({
    order: [
      ['createdAt', 'DESC']
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

exports.findByUserId = async (req, res) => {
  try {
    const mood = await Mood.findAll({
      where: {
        userId: req.body.userId
      },
      include: [User, {model: Comment, include: User}],

      order: [
        ['createdAt', 'DESC']
      ]
    });
    return res.status(200).json(mood);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.findFollowingUsers = async (req, res) => {

  const userList = await Following.findAll({ where: { userId: req.body.userId } });

  Mood.findAll({
    where: { id: [userList] }
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
}

exports.findByFollowing = async (req, res) => {

  const followers = await Following.findAll({
    where: {
      userId: req.body.userId
    },
    attributes: [
      ['followingId', 'followingId']
    ]
  });

  const result = await followers.map(x => x.followingId);

  await result.push(req.body.userId);

  const moods = await Mood.findAll({
    where: {
      userId: result
    },
    include: User,
    order: [
      ['createdAt', 'DESC']
    ]
  });
  return res.send(moods)
};

exports.countMoods = (req, res) => {
  Mood.count({
    where: {
      userId: req.body.userId
    }
  })
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving moods."
      });
    });
};