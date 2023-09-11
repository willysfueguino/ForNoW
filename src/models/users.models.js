const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to trues
    },
  },
  {
    timestamps: true,
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
module.exports = User;
