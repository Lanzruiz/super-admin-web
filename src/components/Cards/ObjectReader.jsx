import { Typography } from "@material-tailwind/react";
import React from "react";

const keyNameFixList = {
  top_left: "Top Left",
  top_right: "Top Right",
  bottom_left: "Bottom Left",
  bottom_right: "Bottom Right",
};

export default function ObjectReader({ item }) {
  return (
    <>
      {item &&
        Object.entries(item)
          .filter(([key]) => !key.includes("__typename"))
          .map(([key, value]) => {
            const updatedKey = keyNameFixList[key] || key; // Use fixed key if available, otherwise use original key
            return (
              <div key={key}>
                <Typography>{`${updatedKey} - ${value}`}</Typography>
              </div>
            );
          })}
    </>
  );
}
