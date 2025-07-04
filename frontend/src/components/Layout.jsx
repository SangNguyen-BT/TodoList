import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Header from "./Header";

const Layout = (props) => {
  const { userName, setUserName } = props;

  const location = useLocation();

  const showHeader = ["/all", "/active", "/completed"].includes(location.pathname);

  return (
    <>
        <Navbar userName={userName} setUserName={setUserName} />

        {showHeader && <Header />}

        <main className="px-4 py-6">
          <Outlet />
        </main>
    </>
  );
};

export default Layout;
