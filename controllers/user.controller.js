const db = require("../models");
const User = db.users;
const Following = db.followers;
const Mood = db.moods;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const randomColor = require('../assets/RandomColor');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "user must have a username!"
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({
            message: "user must have an email!"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: "password can not be empty!"
        });
        return;
    }
    // Create a User
    const color = randomColor[Math.floor(Math.random() * randomColor.length)].color
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        profilImg: color
    };
    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
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

exports.findOne = (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        include: [{model: Mood, include: User}]
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

    const users = await User.findAll({
        where: {
            id: result
        },
        include: {
            model: Following,
            where : {
                userId: req.body.currentUserId
            },
            required: false
        },
        order: [
            ['username']
        ]
    });
    return res.send(users)
};

exports.findByFollowers = async (req, res) => {

    const followers = await Following.findAll({
        where: {
            followingId: req.body.userId
        },
        attributes: [
            ['userId', 'userId']
        ]
    });

    const result = await followers.map(x => x.userId);

    const users = await User.findAll({
        where: {
            id: result
        },
        include: {
            model: Following,
            where : {
                userId: req.body.currentUserId
            },
            required: false
        },
        order: [
            ['username']
        ]
    });
    return res.send(users)
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};