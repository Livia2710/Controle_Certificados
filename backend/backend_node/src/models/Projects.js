import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";

const Projects = sequelize.define("Projects", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Projects;