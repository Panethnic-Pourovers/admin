import { createContext, useContext, ReactNode } from 'react';
import React from 'react';

interface BookContextProps {
  value1: string;
  value2: number;
}

const BooksContext = createContext<BookContextProps | undefined>(undefined);

export const BooksContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const contextValues: BookContextProps = {
    value1: 'Hello from value1!',
    value2: 42
  };

  return (
    <BooksContext.Provider value={contextValues}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export default useBooksContext;
