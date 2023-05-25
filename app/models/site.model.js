module.exports = (sequelize, Sequelize) => {
    const Site = sequelize.define("site", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      photo: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
    });
    return Site;
  };
  