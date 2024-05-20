import { Sequelize, DataTypes } from "sequelize";

// Assuming your database connection details are defined in a separate file (db.js)
import { sequelize } from "../connectors/db.js";
import logger from "../utils/logger.js";

// Function to get the Sequelize model for a given table
const getModel = async (tableName, tableData) => {
  const queryInterface = sequelize.getQueryInterface();
  const tableDefinition = await queryInterface.describeTable(tableName);
  const typeMapping = {
    string: DataTypes.STRING,
    integer: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    boolean: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
  };

  const modelAttributes = {};
  //   for (const [columnName, columnDetails] of Object.entries(tableDefinition)) {
  //     console.log(columnName, columnDetails.type);
  //     modelAttributes[columnName] = {
  //       type: typeMapping[columnDetails.type],
  //       allowNull: columnDetails.allowNull,
  //     };
  //   }

  for (let data in tableData) {
    modelAttributes[data] = {
      type: typeMapping[typeof tableData[data]],
      allowNull: false,
    };
  }

  const table = sequelize.define(tableName, modelAttributes, {
    tableName: tableName.toLowerCase(),
    timestamps: false,
  });

  await table.sync();

  return table;
};

// Express route handler for adding an entry to a table
const addEntryToTable = async (req, res) => {
  try {
    const { tableName } = req.params;
    const { table_name, table_fields } = req.body;
    const Model = await getModel(table_name, table_fields);
    // console.log("Model", table_fields);
    const newEntry = await Model.create(table_fields);
    res.status(201).json({
      message: `Entry added to table ${table_name} successfully.`,
      entry: newEntry,
    });
  } catch (error) {
    logger.error(`Error adding entry to table: ${error}`);
    res.status(500).json({ error: `Failed to add entry to table ${error}` });
  }
};

const getAllEntries = async (req, res) => {
  try {
    const { tableName } = req.params;
    const Model = await getModel(tableName);
    const entries = await Model.findAll();
    res.status(200).json({ entries });
  } catch (error) {
    logger.error(`Error fetching entries from table: ${error}`);
    res.status(500).json({ error: "Failed to fetch entries from table" });
  }
};

export { addEntryToTable, getAllEntries };
