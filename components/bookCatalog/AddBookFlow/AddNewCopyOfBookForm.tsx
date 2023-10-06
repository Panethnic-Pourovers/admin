import {
  searchBookCatalogStyle,
  showSearchCatalogStyle,
} from '@/components/BookCatalog/AddBookFlow/styles/addBookStyles';
import { Box, Button, TextField } from '@mui/material';

const genres = [
  {
    value: 'Action',
    label: 'Action',
  },
  {
    value: 'Comedy',
    label: 'Comedy',
  },
  {
    value: 'History',
    label: 'History',
  },
  {
    value: 'Romance',
    label: 'Romance',
  },
];

const regions = [
  {
    value: 'China',
    label: 'China',
  },
  {
    value: 'India',
    label: 'India',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'Philippines',
    label: 'Philippines',
  },
  {
    value: 'Vietnam',
    label: 'Vietnam',
  },
  {
    value: 'South Korea',
    label: 'South Korea',
  },
];

type addNewCopyOfBookFormProps = {
  title?: string;
  author?: string;
};

const AddNewCopyOfBookForm = (props: addNewCopyOfBookFormProps) => {
  return (
    <Box
      component="form"
      sx={showSearchCatalogStyle}
      noValidate
      autoComplete="off"
    >
      <h3>Add New Book to Catalog</h3>
      <form>
        <TextField
          label="Title"
          variant="standard"
          type="text"
          defaultValue={props.title || ''}
          name="title"
          id="title"
        />
        <TextField
          label="Author"
          variant="standard"
          type="text"
          defaultValue={props.author || ''}
          name="author"
          id="author"
        />
        <TextField
          id="standard-select-currency-native"
          select
          label="Genre"
          defaultValue=""
          SelectProps={{
            native: true,
          }}
          variant="standard"
        >
          {genres.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency-native"
          select
          label="Region"
          defaultValue=""
          SelectProps={{
            native: true,
          }}
          variant="standard"
        >
          {regions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button variant="outlined" sx={searchBookCatalogStyle}>
          Add new book
        </Button>
      </form>
    </Box>
  );
};

export default AddNewCopyOfBookForm;
