import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="grow">
        <Outlet /> {/* This renders the matched child route */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
