import React from "react";

const DefaultLabel = ({ label }) => {
  return (
    <div className="w-fit ">
      <figure className="rounded-md border-2 border-label_dark bg-label_light px-2 py-1 ">
        <h1 className="text-xs text-primary">{label}</h1>
      </figure>
    </div>
  );
};

export default DefaultLabel;
