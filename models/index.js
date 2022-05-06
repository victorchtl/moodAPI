const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: "8889",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.role = require("./role.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.moods = require("./mood.model.js")(sequelize, Sequelize);
db.likes = require("./like.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.followers = require("./follower.model.js")(sequelize, Sequelize);

db.users.hasMany(db.moods);
db.moods.belongsTo(db.users);

db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);

db.moods.hasMany(db.comments);
db.comments.belongsTo(db.moods);

db.users.hasMany(db.likes);
db.likes.belongsTo(db.users);

db.moods.hasMany(db.likes);
db.likes.belongsTo(db.moods);

db.users.hasOne(db.followers);
db.followers.belongsTo(db.users);

db.users.hasOne(db.followers, {
  foreignKey: 'followingId'
});
db.followers.belongsTo(db.users);

db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
