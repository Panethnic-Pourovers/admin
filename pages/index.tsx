import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Home: React.FC = () => {
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
