import { useNavigate } from 'react-router-dom';
import error from '../assets/error.png';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="m-0 flex h-[100vh] items-center justify-center bg-gray-100 text-center">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-16 shadow-lg">
        <img
          src={error}
          alt="Page Not Found"
          className="mb-2 h-auto w-[100%]"
        />
        <h1 className="mb-5 text-5xl font-bold text-green-800">404 Error</h1>
        <p className="mb-5 text-lg text-[#333333]">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <button
          className="w-28 cursor-pointer rounded-full bg-green-500 p-2 font-bold text-white outline-none transition-all duration-200 hover:opacity-70"
          onClick={() => navigate('/', { replace: true })}
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
