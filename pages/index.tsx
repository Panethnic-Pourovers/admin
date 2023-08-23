import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Search from '@/components/Search';
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Home: React.FC = () => {
  // const [search, setSearch] = useState<string>('');

  useEffect(() => {
    window.location.pathname = '/books';
  });
  return (
    <Layout>
      <div className="page"></div>
    </Layout>
  );
};

export default Home;
