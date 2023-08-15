import React from "react"
import { GetStaticProps } from "next"
import Layout from "@/components/Layout"


export const getStaticProps: GetStaticProps = async () => {
  return { 
    props: {}, 
  }
}

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        
      </div>
      <style jsx>{`
        /* Your styling code */
        
      `}</style>
    </Layout>
  )
}

export default Blog
