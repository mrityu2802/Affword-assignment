import React from "react";
import { Loader } from "lucide-react";

const ScreenLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export default ScreenLoader;
