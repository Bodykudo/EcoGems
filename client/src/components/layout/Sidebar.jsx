import { NavLink } from 'react-router-dom';
import { categories } from '../../utils/data';
import { RiHomeFill } from 'react-icons/ri';
import logo from '../../assets/logo.png';

const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';
const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';

function Sidebar({ user, setToggle }) {
  function handleCloseSidebar() {
    if (setToggle) setToggle(false);
  }

  return (
    <div className="h-ful hide-scrollbar flex min-w-210 flex-col items-center justify-between overflow-y-scroll bg-white">
      <div className="flex flex-col">
        <NavLink
          to="/"
          className="my-6 flex w-190 items-center justify-center gap-2 px-5 pt-1"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-[40%]" />
        </NavLink>

        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.name.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="h-10 w-10 rounded-full shadow-sm"
                alt="category"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      {user && (
        <NavLink
          to={`/user-profile/${user?._id}`}
          className="mx-3 my-5 mb-3 flex items-center gap-2 rounded-lg bg-white p-2 shadow-lg transition-shadow duration-75 ease-in-out hover:shadow-xl"
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.image}
            className="h-10 w-10 rounded-full"
            alt="user-profile"
          />
          <p>{user?.userName}</p>
        </NavLink>
      )}
    </div>
  );
}

export default Sidebar;
