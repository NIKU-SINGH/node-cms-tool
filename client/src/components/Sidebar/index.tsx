import { Button } from "../ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import { ListPlus, SquarePen } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="relative  border-gray-700 w-72 bg-blue-800 min-h-screen ">
        <div className="space-y-4">
          <div
            className="px-3 py-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center p-2 bg-gray-800 rounded-lg text-gray-200">
              <img src="/strapi.png" className="rounded w-8 h-8" alt="logo" />
              <div className=" px-2 text-lg font-semibold tracking-tight flex items-center justify-center">
                My CMS
              </div>
            </div>
          </div>
          <div className="px-3 py-2 space-y-2">
            <Button
              onClick={() => navigate("/entity")}
              className="bg-gray-800 w-full gap-2 flex items-center"
            >
              <SquarePen strokeWidth={2} size={18} /> Create Entity
            </Button>
            <Button
              onClick={() => navigate("/entry")}
              className="bg-gray-800 w-full gap-2 flex items-center"
            >
              <ListPlus strokeWidth={2} size={18} /> Add an Entry
            </Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
