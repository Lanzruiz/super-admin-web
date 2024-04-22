import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { nanoid } from "nanoid";
import useParkingLots from "@/utils/hooks/useParkingLots";

export default function DropdownTextField({ onOptionSelected }) {
  const { parkingLots, parkingLotsLoading } = useParkingLots();
  const [selectedOption, setSelectedOption] = useState(null);

  // Map parkingLots and add unique keys using nanoid
  const optionsWithKeys = parkingLots.map((option) => ({
    ...option,
    key: nanoid(),
  }));

  const handleOptionSelected = (option) => {
    setSelectedOption(option);
    // Pass the selected option to the parent component
    onOptionSelected(option);
  };

  return (
    <Autocomplete
      sx={{
        width: "100%",
      }}
      options={optionsWithKeys}
      getOptionLabel={(option) => option.location}
      isOptionEqualToValue={(option, value) => option.id === value?.id} // Add null check for value
      value={selectedOption} // Set the selected option directly
      onChange={(event, newValue) => handleOptionSelected(newValue)}
      renderInput={(params) => (
        <TextField {...params} label="Select an option" />
      )}
    />
  );
}
