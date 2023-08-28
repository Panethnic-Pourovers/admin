import React, { Dispatch, SetStateAction } from 'react';
import { TextField } from '@mui/material';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <TextField
      id="search-input"
      label="Search"
      variant="outlined"
      sx={{
        width: {
          xs: 100,
          sm: 300,
          md: 300,
          lg: 400,
          xl: 500,
        },
        mb: 2,
      }}
      value={search}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      }}
    ></TextField>
  );
};

export default Search;
