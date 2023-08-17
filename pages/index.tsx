import React, { useState } from "react"
import { GetStaticProps } from "next"
import Layout from "@/components/Layout"
import Table from "../components/Table";
import Search from "@/components/Search";
export const getStaticProps: GetStaticProps = async () => {
  return { 
    props: {}, 
  }
}

const Blog: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <Layout>
      <div className="page">
        <h1>Book Catalog</h1>
        <Search 
          search={search}
          setSearch={setSearch}
        />

        <Table />
      </div>
      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Blog
