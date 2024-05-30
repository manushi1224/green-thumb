import React from "react";

type Props = {};

const GreenThumbHeader = (props: Props) => {
  return (
    <div className=" mb-4 flex flex-col gap-4 justify-center items-center">
      <h1 className=" text-5xl font-bold">
        <span className=" bg-gradient-to-r from-blue-300 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text">
          GreenThumb
        </span>
        🌿
      </h1>
      <span className="text-green-100 opacity-85">
        Your friendly neighborhood botanist!
      </span>
    </div>
  );
};

export default GreenThumbHeader;
