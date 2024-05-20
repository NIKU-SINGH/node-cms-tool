import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface FormFieldProps {
  onDelete: () => void;
  onChange: () => void;
  id: number;
}

const sequelizeDataTypes = [
    "string",
    "integer",
    "float",
    "boolean",
    "date",
    "dateonly",
    "text",
    "blob",
    "uuid",
    "enum",
    "json",
    "jsonb",
    "time",
    "array",
    "geometry",
    "geography",
    "citext",
    "tsvector"
];

const FormField: React.FC<FormFieldProps> = ({ id, onChange, onDelete }) => {
//   const [tableName, setTableName] = useState("");
//   const [fieldName, setFieldName] = useState("");
//   const [dataType, setDataType] = useState("string");

  const handleFieldChange = (e: { target: { value: any; }; }) => {
    onChange(id, { name: e.target.value });
  };

  const handleTypeChange = (value: any) => {
    onChange(id, { type: value });
  };

  return (
    <>
      <div className=" shadown-lg rounded space-y-2">
        <div className=" bg-white p-2 rounded  items-center gap-2 grid grid-cols-3">
          <Input
            type="text"
            placeholder="Enter Feild Name"
            onChange={handleFieldChange}
          />
          <div>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select DataType of Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Data Type</SelectLabel>
                  {sequelizeDataTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button variant="destructive" type="button" onClick={onDelete} className="gap-2">
              <Trash2 strokeWidth={2} size={18} />
              Remove Feild
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormField;
