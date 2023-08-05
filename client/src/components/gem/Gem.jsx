import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../../client';
import { fetchUser } from '../../utils/fetchUser';
import GemButtons from './GemButtons';
import GemAuthor from './GemAuthor';

function Gem({ gem: { _id, image, about, save, destination, postedBy } }) {
  const [isHovered, setIsHovered] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  )?.length;

  useEffect(() => setSaved(alreadySaved === 1), [alreadySaved]);

  return (
    <div className="m-2 ">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/gem-detail/${_id}`)}
        className="relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg"
      >
        <img
          className="width-full rounded-lg"
          alt={about}
          src={urlFor(image).url()}
        />

        {isHovered && (
          <GemButtons
            user={user}
            author={postedBy}
            image={image}
            destination={destination}
            save={save}
            gemId={_id}
            saved={saved}
            setSaved={setSaved}
          />
        )}
      </div>

      <GemAuthor author={postedBy} />
    </div>
  );
}

export default Gem;
