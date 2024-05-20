import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Pencil } from "lucide-react";
import FormField from "@/components/FormField";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the type for the fields
type Field = {
  id: number;
  data: {
    name: string;
    type: string;
  };
};

function Entity() {
  const [tableName, setTableName] = useState("");
  const [fields, setFields] = useState<Field[]>([
    { id: 0, data: { name: "", type: "" } },
  ]);

  const addField = () => {
    const newId = fields.length ? fields[fields.length - 1].id + 1 : 0;
    setFields([...fields, { id: newId, data: { name: "", type: "" } }]);
  };

  const deleteField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: number, newData: { name: string; type: string }) => {
    console.log("id is",id,newData)
    setFields(
      fields.map((field) =>
        field.id === id
          ? { ...field, data: { ...field.data, ...newData } }
          : field
      )
    );
  };

  const handleSubmit = async () => {
    // Construct the tableFields object
    const tableFields: { [key: string]: string } = fields.reduce(
      (acc, field) => {
        if (field.data.name) {
          acc[field.data.name] = field.data.type;
        }
        return acc;
      },
      {} as { [key: string]: string }
    );

    // Construct the request body
    const requestBody = {
      table_name: tableName,
      table_fields: tableFields,
    };

    console.log("Request Body:", requestBody);

    // Send the POST request
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/table/create",
        requestBody
      );
      //   console.log(response);
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create table.");
    }
  };

  return (
    <div className="flex flex-col rounded w-full m-2 bg-blue-100 p-2">
      <div className="my-4">
        <h1 className="text-3xl font-semibold">Create a New Table</h1>
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
          </div>
        </div>
        {fields.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            onChange={updateField}
            onDelete={() => deleteField(field.id)}
          />
        ))}

        <div className="bg-white border-dashed border-2 rounded my-4 p-2 flex justify-end">
          <div className="flex gap-4">
            <Button type="button" onClick={addField} className="gap-2">
              <CirclePlus strokeWidth={1.5} color="#ffffff" />
              Add More Fields
            </Button>
            <Button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-800 gap-2"
            >
              <Pencil strokeWidth={2} size={18} /> Create Table
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />{" "}
    </div>
  );
}

export default Entity;
