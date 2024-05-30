import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="w-full gap-x-1 flex justify-left items-center mx-5 mb-10">
      <div className="w-3 bg-green-200 animate-pulse h-3 rounded-full"></div>
      <div className="w-3 animate-pulse h-3 bg-green-400 rounded-full"></div>
      <div className="w-3 h-3 animate-pulse bg-green-600 rounded-full"></div>
    </div>
  );
};

export default Loader;
