module.exports = (sequelize, Sequelize) => {
  const Hotel = sequelize.define("hotel", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(2048),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    link: {
      type: Sequelize.STRING(2048),
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING(2048),
      allowNull: false,
    },
  });
  return Hotel;
};
