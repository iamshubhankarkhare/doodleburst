import React from "react";
import Drawboard from "../components/draw/drawboard.tsx";

const stage = (props: {}) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-20">
      <>Scoreboard</>
      <Drawboard />
      <>Chatboard</>
    </div>
  );
};

export default stage;
