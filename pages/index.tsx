import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import React, { useEffect } from 'react';
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
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
