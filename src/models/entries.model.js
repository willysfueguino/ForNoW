const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const User = sequelize.define(
  "Entry",
  {
    // Model attributes are defined here
    entrySubject: {
      type: DataTypes.STRING(150),
      allowNull:false
    },
    entryText: {
      type: DataTypes.STRING(500000),
      allowNull: false,
    },
    pictureLink: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
module.exports = User;
