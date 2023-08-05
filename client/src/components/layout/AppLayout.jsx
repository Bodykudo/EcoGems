import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Header from './Header';

function AppLayout({ user, searchTerm, setSearchTerm }) {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className=" flex h-screen flex-col bg-gray-50 transition-height duration-75 ease-out md:flex-row">
      <div className="hidden h-screen flex-initial md:flex">
        <Sidebar user={user} closeToggle={setToggleSidebar} />
      </div>

      <Header user={user} setToggleSidebar={setToggleSidebar} />

      {toggleSidebar && (
        <div className="fixed z-10 h-screen w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md">
          <div className="absolute flex w-full items-center justify-end p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <Sidebar user={user} setToggle={setToggleSidebar} />
        </div>
      )}
      <div className="h-screen flex-1 overflow-y-scroll pb-2">
        <div className="px-2 md:px-5">
          <div className="bg-gray-50">
            <Navbar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              user={user}
            />
          </div>
          <div className="h-full w-[100%]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
