import { Circles } from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <Circles type="Circles" color="#00BFFF" height={50} width={200} />
      <p className="m-5 px-2 text-center text-lg dark:text-gray-300">
        {message}
      </p>
    </div>
  );
}

export default Spinner;
