//next imports
import type { Book } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// React imports
import React, { useMemo, useState } from 'react';

// MUI components
import { Box } from '@mui/material';

// custom components
import AddBookModal from '@/components/BookCatalog/addBookModal';
import CheckInOrOut from '@/components/BookCatalog/CheckInOrOut';
import Layout from '@/components/Layout';
import Search from '@/components/Search';
import Table from '@/components/Table';

import { GridColDef } from '@mui/x-data-grid';

// dummy data import
import axios from 'axios';

const isBook = (book: any): book is Book => {
  return (
    book.title &&
    book.author &&
    book.checkedOut &&
    book.lastCheckedOut &&
    book.location &&
    book.barcodeId &&
    book.checkedOutBy
  );
};

export const getServerSideProps = async () => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000'
        : 'http://localhost:3000';
    const response = await axios.get(`${url}/api/books`);

    const books = response.data;
    if (!books) {
      return {
        props: {
          data: { error: 'Error loading books' },
        },
      };
    }
    const bookData: Record<string, unknown>[] = await Promise.all(
      books.map(async (book): Promise<Record<string, unknown>> => {
        const { locationId } = book;
        const location = await axios.get(`${url}/api/locations/${locationId}`);
        const { name } = location.data;
        const checkedoutMember = book.checkedOut ? book.libraryMemberId : 'N/A';
        return {
          id: book.id,
          Title: book.title,
          Author: book.author,
          Genres: book.genres || [],
          Regions: book.regions || [],
          'Checked Out': book.checkedOut,
          'Checked Out By': checkedoutMember,
          'Last Checked Out': book.lastCheckedOut,
          Location: name,
          'Barcode ID': book.barcodeId,
        };
      })
    );

    return {
      props: {
        data: bookData,
        columns: [
          'Title',
          'Author',
          'Genre(s)',
          'Region(s)',
          'Checked Out',
          'Last Checked Out',
          'Location',
          'Barcode ID',
          'Checked Out By',
        ],
      },
    };
  } catch {
    return { props: { data: { error: 'Error loading books' } } };
  }
};

const BooksCatalog = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  //state
  const [searchValue, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Call loadData when searching
  React.useEffect(() => {
    loadData();
  }, [searchValue]);
  // TODO: as the data gets larger, do not pull the entire JSON response from database
  // TODO: Add an API endpoint between database call and frontend for more robust caching

  const { data, columns } = props;

  if (isLoading === false && (data === undefined || columns === undefined))
    setIsLoading(true);

  const tableColumns: GridColDef[] = columns
    ? columns.map((column) => {
        return { field: column, headerName: column, flex: 1 };
      })
    : [];

  // search query filters based on all fields, with memoization
  const filteredItems = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const reformattedData = data.map((book) => {
      const { Genres, Regions } = book;
      const genresString = Array.isArray(Genres)
        ? Genres.map((genre) => genre.name || '').join(', ')
        : '';
      const regionsString = Array.isArray(Regions)
        ? Regions.map((region) => region.name || '').join(', ')
        : '';
      return {
        ...book,
        'Genre(s)': genresString,
        'Region(s)': regionsString,
      };
    });
    return reformattedData.filter((item) => {
      return new RegExp(
        searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'i'
      ).test(Object.values(item).toString());
    });
  }, [data, searchValue]);
  return (
    <Layout>
      <div id="bookCatalog">
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
          }}
          className="bookCatalog-topbar"
        >
          <div className="bookCatalog-topbar-search">
            <Search search={searchValue} setSearch={setSearch} />
          </div>
          <div className="bookCatalog-topbar-buttons">
            <AddBookModal bookData={data} />
          </div>
        </Box>
        <Table rows={filteredItems || []} columns={tableColumns} />
        <Box
          className="bookCatalog-checkButtons"
          sx={{
            display: 'flex',
            flexFlow: 'row-reverse nowrap',
          }}
        >
          <CheckInOrOut title="Check In" CheckInOrOut="Check In" />
          <CheckInOrOut title="Check Out" CheckInOrOut="Check Out" />
        </Box>
      </div>
    </Layout>
  );
};

export default BooksCatalog;
