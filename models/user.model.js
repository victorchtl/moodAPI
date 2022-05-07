module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING
      },
      profilImg: {
        type: Sequelize.STRING
      }
    });
    return User;
  };