module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
      isLike: {
        type: Sequelize.BOOLEAN
      }
    });
    return Like;
  };