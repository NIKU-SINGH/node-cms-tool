import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function GridBackgroundDemo() {
    const navigate = useNavigate();

  return (
    <div>
      <div className="h-screen w-full dark:bg-black  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 py-8">
            Explore the CMS Tool
          </p>
          <Button className="" onClick={() => navigate("/entity")}>Go To Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
