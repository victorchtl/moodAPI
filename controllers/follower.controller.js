const db = require("../models");
const Follower = db.followers;
const Op = db.Sequelize.Op;

exports.follow = async (req, res) => {

    const data = {
        userId: req.body.userId,
        followingId: req.body.followingId
    }

    await Follower.create(data)
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log(err))
};

exports.unfollow = async (req, res) => {

    await Follower.destroy({
        where: {
            userId: req.body.userId,
            followingId: req.body.followingId
        }
    })
        .then(() => {
            res.status(204).end();
        })
        .catch(err => console.log(err))
};

exports.findByUser = (req, res) => {
    Follower.findAll({ where: { userId: req.body.userId } })
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

exports.findByFollowing = (req, res) => {
    Follower.findAll({ where: { followingId: req.body.followingId } })
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

exports.countFollowing = (req, res) => {
    Follower.count({
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

exports.countFollowers = (req, res) => {
    Follower.count({
        where: {
            followingId: req.body.followingId
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