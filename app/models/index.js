const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.itinerary = require("./itinerary.model.js")(sequelize, Sequelize);
db.itineraryDay = require("./itineraryDay.model.js")(sequelize, Sequelize);
db.site = require("./site.model.js")(sequelize, Sequelize);
db.hotel = require("./hotel.model.js")(sequelize, Sequelize);
db.subscription = require("./subscription.model.js")(sequelize, Sequelize);
db.emailActivity = require("./emailActivity.model.js")(sequelize, Sequelize);
db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipeStep.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipeIngredient.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for itinerary
db.user.hasMany(
  db.itinerary,
  { as: "itinerary"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itinerary.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

//foreign key for itineraryDay
db.itinerary.hasMany(
  db.itineraryDay,
  { as: "itineraryDay"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);
db.itineraryDay.belongsTo(
  db.itinerary,
  { as: "itinerary" },
  { foreignKey: {allowNull: false }, onDelete: "CASCADE"}
);

//foreign key for hotel
db.itineraryDay.hasMany(
  db.hotel,
  { as: "hotel"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);
db.hotel.belongsTo(
  db.itineraryDay,
  { as: "itineraryDay" },
  { foreignKey: {allowNull: false }, onDelete: "CASCADE"}
);

//foreign key for site
db.itineraryDay.hasMany(
  db.site,
  { as: "site"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);
db.site.belongsTo(
  db.itineraryDay,
  { as: "itineraryDay" },
  { foreignKey: {allowNull: false }, onDelete: "CASCADE"}
);

//foreign key for subscription
db.user.hasMany(
  db.subscription,
  { as: "subscription"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);
db.subscription.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: {allowNull: false }, onDelete: "CASCADE"}
);
db.itinerary.hasMany(
  db.subscription,
  { as: "subscription"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);
db.subscription.belongsTo(
  db.itinerary,
  { as: "itinerary" },
  { foreignKey: {allowNull: false }, onDelete: "CASCADE"}
);

//foreign key for emailActivity
db.user.hasMany(
  db.emailActivity,
  { as: "emailActivity"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);
db.emailActivity.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: {allowNull: false }, onDelete: "CASCADE"}
);
db.itinerary.hasMany(
  db.emailActivity,
  { as: "emailActivity"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);
db.emailActivity.belongsTo(
  db.itinerary,
  { as: "itinerary" },
  { foreignKey: {allowNull: false }, onDelete: "CASCADE"}
);


// foreign key for recipe
db.user.hasMany(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipe.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for recipeStep
db.recipe.hasMany(
  db.recipeStep,
  { as: "recipeStep" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeStep.belongsTo(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for recipeIngredient
db.recipeStep.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipe.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.ingredient.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.recipeStep,
  { as: "recipeStep" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.ingredient,
  { as: "ingredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
