import { Sequelize, DataTypes } from "sequelize";

// Assuming your database connection details are defined in a separate file (db.js)
import { sequelize } from "../connectors/db.js";
import logger from "../utils/logger.js";

// Function to get the Sequelize model for a given table
const getModel = async (tableName) => {
  const queryInterface = sequelize.getQueryInterface();
  const tableDefinition = await queryInterface.describeTable(tableName);

  const modelAttributes = {};
  for (const [columnName, columnDetails] of Object.entries(tableDefinition)) {
    modelAttributes[columnName] = {
      type: DataTypes[columnDetails.type],
      allowNull: columnDetails.allowNull,
    };
  }

    return sequelize.define(tableName, modelAttributes, {
      tableName: tableName.toLowerCase(),
      timestamps: false,
    });

//   return modelAttributes;
};

// Express route handler for adding an entry to a table
const addEntryToTable = async (req, res) => {
  try {
    const { tableName } = req.params;
    const entryData = {
      product_name: "Apple MacBook Pro",
      price: "$300 USD",
      description: "Amazing must buy",
      in_stock: "100",
    };
    const Model = await getModel(tableName);
    const newEntry = await Model.create(entryData);
    // res.status(201).json({
    //   message: `Entry added to table ${tableName} successfully.`,
    //   entry: newEntry,
    // });
    res.send(newEntry);
  } catch (error) {
    logger.error("Error adding entry to table:", error);
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
    logger.error("Error fetching entries from table:", error);
    res.status(500).json({ error: "Failed to fetch entries from table" });
  }
};

export { addEntryToTable, getAllEntries };
