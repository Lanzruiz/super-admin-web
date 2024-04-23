import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { nanoid } from "nanoid";
import useParkingLots from "@/utils/hooks/useParkingLots";

const options = [
  { value: "lightVehicles", label: "Light Vehicles" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "heavyVehicles", label: "Trucks and Buses" },
];

export default function AutocompleteTextField({ onOptionSelected }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event, option) => {
    setSelectedOption(option);
    onOptionSelected(option);
  };

  return (
    <Autocomplete
      value={selectedOption}
      onChange={handleChange}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select Slot Type" />
      )}
    />
  );
}
