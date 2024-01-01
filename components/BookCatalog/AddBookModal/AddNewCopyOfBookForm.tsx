import { BooksContext, formatDate } from '@/pages/books';
import getEnvUrl from '@/src/utils/getEnvUrl';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useContext } from 'react';
import {
  searchBookCatalogStyle,
  showSearchCatalogStyle
} from './styles/addBookStyles';

const genres = [
  {
    value: 'Action',
    label: 'Action'
  },
  {
    value: 'Comedy',
    label: 'Comedy'
  },
  {
    value: 'History',
    label: 'History'
  },
  {
    value: 'Romance',
    label: 'Romance'
  }
];

const regions = [
  {
    value: 'China',
    label: 'China'
  },
  {
    value: 'India',
    label: 'India'
  },
  {
    value: 'Japan',
    label: 'Japan'
  },
  {
    value: 'Philippines',
    label: 'Philippines'
  },
  {
    value: 'Vietnam',
    label: 'Vietnam'
  },
  {
    value: 'South Korea',
    label: 'South Korea'
  }
];

type addNewCopyOfBookFormProps = {
  title?: string;
  author?: string;
};

const AddNewCopyOfBookForm = (props: addNewCopyOfBookFormProps) => {
  const context = useContext(BooksContext);
  if (!context) throw new Error('Context is null');
  const { data, setData } = context;

  const sendBook = async (e: any) => {
    e.preventDefault();
    const url = getEnvUrl();
    const { title, author, genre, region } = e.target;
    const book = {
      title: title.value,
      author: author.value,
      checkedOut: false,
      lastCheckedOut: null,
      location: 'PEPO Library',
      genres: [genre.value],
      regions: [region.value]
    };

    const response = await axios.post(`${url}/api/books`, book);
    console.log(response);

    const localUpdate = {
      id: response.data.id,
      Title: response.data.title,
      Author: response.data.author,
      Genres: response.data.genres || [],
      Regions: response.data.regions || [],
      'Checked Out': response.data.checkedOut || false,
      'Checked Out By': 'N/A',
      'Last Checked Out': formatDate(response.data.lastCheckedOut),
      Location: response.data.location.name,
      'Barcode ID': response.data.barcodeId
    };

    console.log(localUpdate);
    setData([...data, localUpdate]);

    return response;
  };

  return (
    <Box component="div" sx={showSearchCatalogStyle}>
      <h3>Add New Book to Catalog</h3>
      <form onSubmit={sendBook}>
        <TextField
          label="Title"
          variant="standard"
          type="text"
          value={props.title || ''}
          name="title"
          id="title"
        />
        <TextField
          label="Author"
          variant="standard"
          type="text"
          value={props.author || ''}
          name="author"
          id="author"
        />
        <TextField
          id="Genre"
          select
          label="Genre"
          name="genre"
          defaultValue=""
          SelectProps={{
            native: true
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
          id="Region"
          select
          label="Region"
          name="region"
          defaultValue=""
          SelectProps={{
            native: true
          }}
          variant="standard"
        >
          {regions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button variant="outlined" type="submit" sx={searchBookCatalogStyle}>
          Add new book
        </Button>
      </form>
    </Box>
  );
};

export default AddNewCopyOfBookForm;
