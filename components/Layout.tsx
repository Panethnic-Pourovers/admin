// react imports
import React, { ReactNode } from "react";

// next imports
import Head from 'next/head';
import {useRouter} from 'next/router'

// component imports
import Header from "@/components/Header";

//local imports
import { PAGES } from "src/utils/constants";

type Props = {
  children: ReactNode;
};



const Layout: React.FC<Props> = (props) => {

  const router = useRouter();

  const filterFunc = (item) =>{
    return item[1].link === router.pathname
  }
  
  const currentPage = () => {
    if(router.pathname === '/') return 'Home'
    const entry = Object.entries(PAGES).filter(filterFunc)
    return entry[0][1].name;
  }

  return (
  <>
    <Head>
      <title>{currentPage()} | PEPO Administration</title>
    </Head>
    <div>
      <Header />
      
      <div className="layout">
        <h1>{currentPage()}</h1>
        {props.children}
      </div>
      <style jsx global>{`
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          background: rgba(0, 0, 0, 0.05);
        }

        input,
        textarea {
          font-size: 16px;
        }

        button {
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </div>
  </>
)};

export default Layout;
