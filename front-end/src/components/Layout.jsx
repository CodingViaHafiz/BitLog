import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow w-full px-4 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
