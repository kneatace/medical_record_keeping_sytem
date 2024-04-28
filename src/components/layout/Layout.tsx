import SideMenu from "../sidemenu/SideMenu";
import scss from "@/styles/Layout.module.scss";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();

  const mainStyle = session ? scss.layoutWithSession : scss.layout;

  return (
    <>
      <Head>
        <title>EMR System Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={mainStyle}>
        {session && <SideMenu />}
        {children}
      </main>
    </>
  );
};

export default Layout;