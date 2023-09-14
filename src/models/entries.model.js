const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Entry = sequelize.define(
  "Entry",
  {
    // Model attributes are defined here
    entrySubject: {
      type: DataTypes.STRING(150),
      allowNull:false
    },
    entryBody: {
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
console.log(Entry === sequelize.models.Entry); // true
module.exports = Entry;
