import { Link } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import { HiMenu } from 'react-icons/hi';
import logo from '../../assets/logo1.png';

function Header({ user, setToggleSidebar }) {
  return (
    <div className="flex flex-row md:hidden">
      <div className="flex w-full flex-row items-center justify-between p-2 shadow-md">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(true)}
        />
        <Link to="/">
          <img src={logo} alt="logo" className="w-52" />
        </Link>

        {user ? (
          <Link to={`/user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user-pic"
              className="h-10 w-10 rounded-full"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="transition-bg flex h-12 w-12 items-center justify-center rounded-lg bg-red-500 text-white duration-150 ease-in-out hover:opacity-80 md:w-14"
          >
            <BiLogIn size={34} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
