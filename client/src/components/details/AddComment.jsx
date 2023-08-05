import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../client';

function AddComment({ user, gemId, gemDetails, setGemDetails }) {
  const [comment, setComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  function addComment() {
    if (comment) {
      setIsCommenting(true);

      client
        .patch(gemId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user?._id,
            },
            createdAt: new Date().toISOString(),
          },
        ])
        .commit()
        .then(() => {
          if (gemDetails?.comments) {
            setGemDetails({
              ...gemDetails,
              comments: [
                ...gemDetails?.comments,
                {
                  comment,
                  postedBy: { userName: user?.userName, image: user?.image },
                  createdAt: new Date().toISOString(),
                },
              ],
            });
          } else {
            setGemDetails({
              ...gemDetails,
              comments: [
                {
                  comment,
                  postedBy: { userName: user?.userName, image: user?.image },
                  createdAt: new Date().toISOString(),
                },
              ],
            });
          }

          setComment('');
          setIsCommenting(false);
        });
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <Link
        to={`/user-profile/${user?._id}`}
        className="flex w-fit items-center gap-2 rounded-lg bg-gray-100 p-1 transition-all duration-200 hover:shadow-md"
      >
        <img
          src={user?.image}
          alt="user-profile"
          className="h-10 w-10 rounded-full object-cover"
        />
      </Link>
      <textarea
        type="text"
        className="flex-1 resize-none rounded-2xl border-2 border-gray-100 px-1 py-2 outline-none transition-all duration-200 focus:border-gray-300"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment.."
        disabled={isCommenting}
      />
      <button
        type="button"
        className={`rounded-full bg-green-500 px-6 py-2 text-base font-semibold text-white outline-none ${
          (isCommenting || !comment) && 'cursor-not-allowed opacity-70'
        }`}
        onClick={addComment}
      >
        {isCommenting ? 'Posting...' : 'Comment'}
      </button>
    </div>
  );
}

export default AddComment;
