module.exports = (sequelize, Sequelize) => {
    const Mood = sequelize.define("mood", {
      message: {
        type: Sequelize.STRING
      }
    });
    return Mood;
  };
  