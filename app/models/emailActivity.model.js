module.exports = (sequelize, Sequelize) => {
    const EmailActivity = sequelize.define("emailActivity", {
      emailList: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      notificationType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailBody: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
    });
    return EmailActivity;
  };
  