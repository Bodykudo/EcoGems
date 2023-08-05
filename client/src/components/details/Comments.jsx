import { formatTimestamp } from '../../utils/helpers';

function Comments({ comments }) {
  return (
    <>
      <h2 className="mt-5 text-2xl">Comments</h2>
      <div className="max-h-72 overflow-y-auto">
        {comments?.map((comment, i) => (
          <div
            key={i}
            className="mt-5 flex items-center gap-2 rounded-lg bg-white"
          >
            <img
              src={comment?.postedBy?.image}
              alt="user-profile"
              className="h-10 w-10 cursor-pointer rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">{comment?.postedBy?.userName}</p>
              <p>{comment.createdAt && formatTimestamp(comment.createdAt)}</p>
              <p>{comment?.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comments;
