import { Sequelize, DataTypes } from "sequelize";

// Assuming your database connection details are defined in a separate file (db.js)
import { sequelize } from "../connectors/db.js";
import logger from "../utils/logger.js";

const createNewTable = async (name, fields) => {
  const typeMapping = {
    string: DataTypes.STRING,
    integer: DataTypes.INTEGER,
    boolean: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
  };

  const modelAttributes = {};
  for (const [fieldName, fieldType] of Object.entries(fields)) {
    modelAttributes[fieldName] = {
      type: typeMapping[fieldType] || DataTypes.STRING,
      allowNull: false,
    };
  }

  const table = sequelize.define(name, modelAttributes, {
    tableName: name.toLowerCase(),
    timestamps: false,
  });

  await table.sync({ alter: true });

  return table;
};

const createTable = async (req, res) => {
  try {
    const { table_name, table_fields } = req.body;
    const newTable = await createNewTable(table_name, table_fields);

    res.status(200).json({
      message: `Table with TableName:${table_name} created successfully.`,
      entity: newTable,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Table" });
  }
};

// Function to get all table names
const getAllTables = async (req, res) => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();

    res.status(200).json({ tables });
  } catch (error) {
    console.error("Error fetching table names:", error);
    res.status(500).json({ error: "Failed to retrieve table names" });
  }
};

// Express route handler for fetching table details
const getTableDetails = async (req, res) => {
  try {
    const tableName = req.params.name;
    const queryInterface = sequelize.getQueryInterface();
    const tableDetails = await queryInterface.describeTable(tableName);

    res.status(200).json({ tableName, tableDetails });
  } catch (error) {
    console.error("Error fetching table details:", error);
    res.status(500).json({ error: "Failed to retrieve table details" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const tableName = req.params.name;
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.dropTable(tableName);

    res
      .status(200)
      .json({ message: `Table ${tableName} deleted successfully` });
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ error: "Failed to delete table" });
  }
};

export { createTable, getAllTables, getTableDetails, deleteTable };
