import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the type for the fields
// type Field = {
//   id: number;
//   data: {
//     name: string;
//     type: string;
//   };
// };

function Entity() {
  const [tableName, setTableName] = useState("");
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const [tableList, seTableList] = useState([]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const requestBody = {
      table_name: tableName,
      table_fields: formData,
    };

    console.log(requestBody);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/api/v1/entry/${tableName}`,
        requestBody
      );
      console.log(response);
      // Display toast on success
      toast.success(`${response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const transformTableDetails = (details: {
    [x: string]: { type: string };
  }) => {
    const result = {};
    Object.keys(details).forEach((field) => {
      if (field !== "id") {
        result[field] = details[field].type.split(" ")[0].toLowerCase();
      }
    });
    return result;
  };

  const getTableFields = async () => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:8080/api/v1/table/${tableName}`
      );
      const transformedDetails = transformTableDetails(
        result.data.tableDetails
      );
      setFields(transformedDetails);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Get table Details.");
    }
  };

  const getAllTableList = async () => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:8080/api/v1/table/getAll`
      );
      seTableList(result.data.tables);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Get table Details.");
    }
  };

  useEffect(() => {
    getAllTableList();
  }, [tableList]);

  return (
    <div className="flex flex-col rounded w-full m-2 bg-blue-100 p-2">
      <div className="my-4">
        <h1 className="text-3xl font-semibold">Add Entry to Table</h1>
      </div>
      <div className="my-4 bg-white p-2 rounded ">
        <div className="border-dashed border-2 p-2">
          <h1 className="text-2xl font-semibold my-2">List of Tables</h1>
          <div className="flex flex-wrap gap-2">
            {tableList.map((table) => (
              <div
                key={table}
                className="bg-blue-800 text-white p-2 rounded cursor-pointer"
                onClick={() => setTableName(table)}
              >
                {table}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2 bg-white p-2 rounded">
        <div className=" shadown-lg rounded space-y-2">
          <div className="flex  p-2 rounded  items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter Table Name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
            <Button onClick={getTableFields}>Get Table Fields</Button>
          </div>
        </div>
        <div>
          {Object.entries(fields).map(([fieldName, fieldType]) => (
            <div
              key={fieldName}
              className="flex p-2 rounded items-center space-x-2"
            >
              <label className="w-1/3">{fieldName}</label>
              <Input
                type={fieldType}
                name={fieldName}
                placeholder={`Enter ${fieldName}`}
                value={formData[fieldName] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="bg-white border-dashed border-2 rounded my-4 p-2 flex justify-end">
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-800 gap-2 flex items-center"
            >
              <SquarePen strokeWidth={2} size={18} />
              Add Entry to Table
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />{" "}
    </div>
  );
}

export default Entity;
