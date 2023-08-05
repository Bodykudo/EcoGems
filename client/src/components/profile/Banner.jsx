import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { BiLogOut } from 'react-icons/bi';

function Banner({ user, userData, userId }) {
  const navigate = useNavigate();

  function handleLogout() {
    googleLogout();
    localStorage.clear();
    navigate('/');
    window.location.reload(true);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[50vh] w-full bg-banner bg-center bg-no-repeat shadow-lg"></div>
      <img
        src={userData?.image}
        alt="user-image"
        className="-mt-10 h-20 w-20 rounded-full shadow-xl"
      />
      <h1 className="mt-3 text-center text-3xl font-bold">
        {userData?.userName}
      </h1>
      <div className="z-1 absolute right-0 top-0 p-2">
        {userId === user?.sub && (
          <button
            className="cursor-pointer rounded-full bg-white p-2 shadow-md outline-none transition-all duration-200 hover:shadow-2xl"
            onClick={handleLogout}
          >
            <BiLogOut color="red" fontSize={26} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Banner;
