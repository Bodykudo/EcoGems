import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../client';
import { gemDetailsMoreGemsQuery, gemDetailsQuery } from '../utils/data';
import GemInfo from '../components/details/GemInfo';
import Comments from '../components/details/Comments';
import AddComment from '../components/details/AddComment';
import MoreGems from '../components/details/MoreGems';
import Spinner from '../components/ui/Spinner';

function GemDetails({ user }) {
  const [gems, setGems] = useState([]);
  const [gemDetails, setGemDetails] = useState(null);
  const { gemId } = useParams();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  function fetchGemDetails() {
    const query = gemDetailsQuery(gemId);

    if (query) {
      client.fetch(query).then((data) => {
        setGemDetails(data[0]);
        console.log(data[0]);
        if (data[0]) {
          setIsLoadingMore(true);
          const queryMore = gemDetailsMoreGemsQuery(data[0]);
          client.fetch(queryMore).then((response) => {
            setGems(response);
            setIsLoadingMore(false);
          });
        }
      });
    }
  }

  useEffect(() => {
    fetchGemDetails();
  }, [gemId]);

  if (!gemDetails)
    return (
      <div className="flex h-[70vh] md:h-[80vh]">
        <Spinner message="Loading Gem..." />
      </div>
    );

  return (
    <>
      <div className="m-auto flex max-w-[150rem] flex-col items-center rounded-[3.2rem] bg-white xl:flex-row">
        <div className="flex flex-initial items-center justify-center md:items-start xl:w-[40%]">
          <img
            src={gemDetails?.image && urlFor(gemDetails.image).url()}
            className="rounded-b-lg rounded-t-3xl"
            alt={gemDetails?.about}
          />
        </div>

        <div className="w-full p-5 xl:w-[60%]">
          <GemInfo gemDetails={gemDetails} />

          <Comments comments={gemDetails?.comments} />
          {user && (
            <AddComment
              user={user}
              gemId={gemId}
              gemDetails={gemDetails}
              setGemDetails={setGemDetails}
            />
          )}
        </div>
      </div>

      <MoreGems isLoadingMore={isLoadingMore} gems={gems} />
    </>
  );
}

export default GemDetails;
