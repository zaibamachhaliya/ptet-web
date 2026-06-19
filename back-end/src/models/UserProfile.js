const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserProfile = sequelize.define(
    "UserProfile",
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },

      target_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      test_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      country_applying_to: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      visa_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      streak_days: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },

      last_active: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      tableName: "user_profiles",
      timestamps: false,
    }
  );

  return UserProfile;
};