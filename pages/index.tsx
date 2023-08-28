import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Search from '@/components/Search';
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const Blog: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <Layout>
      <div className="page"></div>
    </Layout>
  );
};

export default Blog;
