import React from "react"
import { GetStaticProps } from "next"
import Layout from "@/components/Layout"
import Table from "../components/Table";

export const getStaticProps: GetStaticProps = async () => {
  return { 
    props: {}, 
  }
}

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        <h1>Book Catalog</h1>
        <Table />
      </div>
      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Blog
