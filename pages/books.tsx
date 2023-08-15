import React, {useState} from "react";
import { GetStaticProps } from "next";
import Layout from "@/components/Layout";

import {BookCatalog} from "@/components/Table";

const Catalog = () => {
  return (
    <Layout>
      <div className="page">
        <h1>Book Catalog</h1> {/* Only display the header */}
        <BookCatalog />
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          /* Other styling properties */
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Catalog;
