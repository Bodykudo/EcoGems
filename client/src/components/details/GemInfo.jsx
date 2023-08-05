import { Link } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';

function GemInfo({ gemDetails }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            href={`${gemDetails?.image?.asset?.url}?dl=`}
            download
            onClick={(e) => e.stopPropagation()}
            className="text-dark outline-non flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl opacity-75 transition-all duration-200 hover:opacity-100 hover:shadow-md dark:bg-gray-900 dark:text-gray-300"
          >
            <MdDownloadForOffline fontSize={24} />
          </a>
        </div>
        {gemDetails?.destination && (
          <a
            className="py-full rounded-lg bg-gray-100 px-4 transition-all duration-200 hover:shadow-md dark:bg-gray-900 dark:text-gray-300"
            href={gemDetails?.destination}
            target="_blank"
            rel="noreferrer"
          >
            {gemDetails?.destination}
          </a>
        )}
      </div>
      <div className="dark:text-gray-300">
        <h1 className="mt-3 break-words text-4xl font-bold">
          {gemDetails?.title}
        </h1>
        <p className="mt-3">{gemDetails?.about}</p>
      </div>

      <Link
        to={`/user-profile/${gemDetails?.postedBy?._id}`}
        className="mt-5 flex w-fit items-center gap-2 rounded-lg bg-gray-100 px-4 py-1 transition-all duration-200 hover:shadow-md dark:bg-gray-900 dark:text-gray-300"
      >
        <img
          src={gemDetails?.postedBy?.image}
          alt="user-profile"
          className="h-8 w-8 rounded-full object-cover dark:opacity-70"
        />
        <p className="font-semibold capitalize">
          {gemDetails?.postedBy?.userName}
        </p>
      </Link>
    </>
  );
}

export default GemInfo;
