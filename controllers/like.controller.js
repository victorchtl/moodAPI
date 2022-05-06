const db = require("../models");
const Like = db.likes;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

exports.createLike = (req, res) => {


    const like = {
        userId: req.body.userId,
        moodId: req.body.moodId,
        isLike: true
    };

    Like.create(like)
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


exports.createDislike = (req, res) => {


    const like = {
        userId: req.body.userId,
        moodId: req.body.moodId,
        isLike: false
    };

    Like.create(like)
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
    Like.findAll()
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


exports.findTopMoods = (req, res) => {
    Like.findAll({
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('moodId')), 'n_moodId']
            ]
        },
        group: 'n_moodId'
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

exports.dislike = async (req, res) => {

    let like = await Like.findOne({ userId: req.body.userId, moodId: req.body.moodId });

    like.isLike = false;

    like.save();
    res.status(200).json({ like });
};

exports.findByUserAndMoodId = async (req, res) => {
    try {
        const like = await Like.findAll({
            where: {
                userId: req.body.userId,
                moodId: req.body.moodId
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return res.status(200).json({ like });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};