import {
  searchBookCatalogStyle,
  showSearchCatalogStyle,
} from '@/components/BookCatalog/AddBookFlow/styles/addBookStyles';
import { Box, Button } from '@mui/material';

type bookFoundModalFormProps = {
  foundBookId: number;
  showSecondStepFunction: () => void;
};

const BookFoundModalForm = (props: bookFoundModalFormProps) => {
  return (
    <Box sx={showSearchCatalogStyle}>
      <p>Book found in catalog</p>
      <p>Book ID: {props.foundBookId}</p>
      <Button
        onClick={props.showSecondStepFunction}
        variant="outlined"
        sx={searchBookCatalogStyle}
      >
        Add new copy
      </Button>
    </Box>
  );
};

export default BookFoundModalForm;
