import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import "../../public/css/modal.css";
import { namingFix } from "@/data/namingFix";
import ObjectReader from "./Cards/ObjectReader";

const Modal = ({ isOpen, onClose, rowData, title }) => {
  const filteration = [
    "__typename",
    "id",
    "officerId",
    "vehicleId",
    "violationTypeId",
  ];

  const renderContent = () => {
    if (!rowData) return null;

    return Object.entries(rowData)
      .filter((fil) => !filteration.includes(fil[0]))
      .map(([key, value], index) => {
        let textColorClass = "";
        if (key === "status") {
          if (value.toLowerCase() === "resolved") {
            textColorClass = "text-green-600";
          } else if (value.toLowerCase() === "pending") {
            textColorClass = "text-orange-400";
          } else {
            textColorClass = "text-red-600";
          }
        }

        return (
          <div key={key} className="my-4 flex p-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="text-uppercase w-1/2 text-left font-normal"
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >{`${namingFix.find((item) => Object.keys(item).includes(key))?.[key] !== undefined ? namingFix.find((item) => Object.keys(item).includes(key))[key] : key || ""}:`}</Typography>

            {key === "violationType" ? (
              value ? (
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={`w-full pl-8 text-left font-bold ${textColorClass}`}
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {value || ""}
                </Typography>
              ) : null
            ) : (
              <Typography
                variant="small"
                color="blue-gray"
                className={` w-full pl-8 text-left  font-bold  ${textColorClass}`}
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {(typeof value !== "object" && value) || (
                  <ObjectReader item={value} />
                )}
              </Typography>
            )}
          </div>
        );
      });
  };

  return (
    <div className={`modal ${isOpen ? "is-open" : ""}`}>
      <div className="modal-content rounded-xl p-4">
        {/* <span className="close" onClick={onClose}>
          &times;
        </span> */}
        <div>
          <Typography
            variant="h2"
            style={{
              fontSize: "1.5rem",
              padding: 16,
              textTransform: "uppercase",
            }}
          >
            {`${title} information`}
          </Typography>
        </div>
        <div className="grid-flow-col p-4">{renderContent()}</div>
        <div style={{ textAlign: "center", marginTop: "auto" }}>
          <Button
            onClick={onClose}
            style={{
              background: "red",
            }}
            className="align-middle"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
