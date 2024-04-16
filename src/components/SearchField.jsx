import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';

export default function SearchBar({
  searchQuery,
  handleSearchQuery,
  handleSearch,
}) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          handleSearchQuery(e.target.value);
        }}
        onKeyPress={handleKeyPress} // Add this line to listen for key press events
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
