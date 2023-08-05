import { Link, useNavigate } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();

  return (
    <div className="mt-5 flex w-full gap-2 pb-7 md:gap-5">
      <div className="flex w-full items-center justify-start rounded-md border-none bg-white px-5 outline-none transition-shadow duration-75 ease-in-out focus-within:shadow-sm dark:bg-gray-800">
        <IoMdSearch fontSize={21} className="ml-1 dark:text-gray-300" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          onFocus={() => navigate('/search')}
          className="w-full bg-white p-2 outline-none dark:bg-gray-800 dark:text-gray-300"
        />
      </div>
      <div className="flex gap-3">
        {user ? (
          <>
            <Link to={`/user-profile/${user?._id}`} className="hidden md:block">
              <img
                src={user?.image}
                alt="user-img"
                className="h-12 w-14 rounded-lg dark:opacity-70"
              />
            </Link>
            <Link
              to="/create-gem"
              className="transition-bg flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white duration-150 ease-in-out hover:opacity-80 dark:bg-darkGreen md:w-14"
            >
              <IoMdAdd fontSize={26} />
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="transition-bg  hidden h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white duration-150 ease-in-out hover:opacity-80 dark:bg-darkGreen dark:text-gray-300 md:flex md:w-14"
            >
              <BiLogIn size={34} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
