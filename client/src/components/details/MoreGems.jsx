import MasonryLayout from '../ui/MasonryLayout';
import Spinner from '../ui/Spinner';

function MoreGems({ isLoadingMore, gems }) {
  return (
    <>
      {!isLoadingMore ? (
        gems?.length ? (
          <>
            <h2 className="mb-4 mt-8 text-center text-2xl font-bold dark:text-gray-300">
              More like this
            </h2>
            <MasonryLayout gems={gems} />
          </>
        ) : (
          <h2 className="my-4 text-2xl font-bold dark:text-gray-300">
            No similar gems to this gem
          </h2>
        )
      ) : (
        <div className="mt-14">
          <Spinner message="Loading more gems..." />
        </div>
      )}
    </>
  );
}

export default MoreGems;
