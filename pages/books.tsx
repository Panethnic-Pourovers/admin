//next imports
import type { Book } from '@prisma/client';
import { InferGetServerSidePropsType } from 'next';

// React imports
import React, { createContext, useEffect, useMemo, useState } from 'react';

// MUI components
import { Box, MenuItem, Select } from '@mui/material';

// custom components
import AddBookModal from '@/components/BookCatalog/AddBookModal';

import CheckInOrOut from '@/components/BookCatalog/CheckInOrOut';
import Layout from '@/components/Layout';
import Search from '@/components/Search';
import Table from '@/components/Table';

import { GridColDef } from '@mui/x-data-grid';

import getEnvUrl from '@/src/utils/getEnvUrl';
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

export const formatDate = (date: string): string => {
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const year = date.substring(0, 4);
  let hours = date.substring(11, 13);
  const minutes = date.substring(14, 16);
  let timePeriod = 'AM';
  const hoursInt = parseInt(hours);
  if (hoursInt > 12) {
    timePeriod = 'PM';
    hours = (hoursInt - 12).toString();
  }
  if (hours.length < 2) {
    hours = '0' + hours;
  }
  return `${month}/${day}/${year} ${hours}:${minutes}${timePeriod}`;
};

export const getServerSideProps = async () => {
  try {
    const url = getEnvUrl();
    const [responseBooks, responseRegions, responseLocations, responseGenres] =
      await Promise.all([
        axios.get(`${url}/api/books`),
        axios.get(`${url}/api/regions`),
        axios.get(`${url}/api/locations`),
        axios.get(`${url}/api/genres`)
      ]);

    const books = responseBooks.data;
    const regionsData = responseRegions.data;
    const locationsData = responseLocations.data;
    const genresData = responseGenres.data;

    if (!books) {
      return {
        props: {
          data: { error: 'Error loading books' }
        }
      };
    }
    const bookData: Record<string, unknown>[] = await Promise.all(
      books.map(async (book): Promise<Record<string, unknown>> => {
        const { locationId } = book;
        const location = await axios.get(`${url}/api/locations/${locationId}`);
        let memberResponse;
        if (book.libraryMemberId) {
          memberResponse = await axios.get(
            `${url}/api/members/${book.libraryMemberId}`
          );
        }
        const { name } = location.data;
        const formattedDate = formatDate(book.lastCheckedOut);
        let memberName = 'N/A';
        if (memberResponse) {
          memberName =
            memberResponse.data.firstName + ' ' + memberResponse.data.lastName;
        }

        return {
          id: book.id,
          Title: book.title,
          Author: book.author,
          Genres: book.genres || [],
          Regions: book.regions || [],
          'Checked Out': book.checkedOut,
          'Checked Out By': memberName,
          'Last Checked Out': formattedDate,
          Location: name,
          'Barcode ID': book.barcodeId
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
          'Checked Out By'
        ],
        genres: genresData,
        locations: locationsData,
        regions: regionsData
      }
    };
  } catch {
    return { props: { data: { error: 'Error loading books' } } };
  }
};

export const BooksContext = createContext(null);

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

  const { columns, genres, locations, regions } = props;
  const [data, setData] = useState(props.data);

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
        'Region(s)': regionsString
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
    <BooksContext.Provider value={{ data: data, setData: setData }}>
      <Layout>
        <div id="bookCatalog">
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'space-between'
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
          <Table
            rows={filteredItems || []}
            columns={tableColumns}
            genres={genres}
            regions={regions}
            locations={locations}
            data={data}
            setData={setData}
          />
          <Box
            className="bookCatalog-checkButtons"
            sx={{
              display: 'flex',
              flexFlow: 'row-reverse nowrap'
            }}
          >
            <CheckInOrOut title="Check In" CheckInOrOut="Check In" />
            <CheckInOrOut title="Check Out" CheckInOrOut="Check Out" />
          </Box>
        </div>
      </Layout>
    </BooksContext.Provider>
  );
};

export default BooksCatalog;
