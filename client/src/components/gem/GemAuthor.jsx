import { Link } from 'react-router-dom';

function GemAuthor({ author }) {
  return (
    <Link
      to={`/user-profile/${author?._id}`}
      className="mt-2 flex items-center gap-2"
    >
      <img
        src={author?.image}
        alt="user-profile"
        className="h-8 w-8 rounded-full object-cover"
      />{' '}
      <p className="font-semibold capitalize">{author?.userName}</p>
    </Link>
  );
}

export default GemAuthor;
