import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { client, urlFor } from '../client';
import { gemDetailsMoreGemsQuery, gemDetailsQuery } from '../utils/api';
import GemInfo from '../components/details/GemInfo';
import Comments from '../components/details/Comments';
import AddComment from '../components/details/AddComment';
import MoreGems from '../components/details/MoreGems';
import Spinner from '../components/ui/Spinner';
import { Helmet } from 'react-helmet-async';

function GemDetails({ user }) {
  const [gems, setGems] = useState([]);
  const [gemDetails, setGemDetails] = useState(null);
  const { gemId } = useParams();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const nvigate = useNavigate();

  function fetchGemDetails() {
    const query = gemDetailsQuery(gemId);

    if (query) {
      client.fetch(query).then((data) => {
        if (!data.length) {
          nvigate('/not-found');
        }

        setGemDetails(data[0]);
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
      <Helmet>
        <title>EcoGems - {gemDetails?.title}</title>
        <meta name="description" content={gemDetails?.about} />
        <meta property="og:title" content={`${gemDetails?.title} - EcoGems`} />
        <meta property="og:description" content={gemDetails?.about} />
        <meta
          property="og:url"
          content={`https://ecogems.vercel.app/${gemId}`}
        />
        <meta property="og:image" content={urlFor(gemDetails?.image).url()} />
      </Helmet>

      <div className="m-auto flex max-w-[150rem] flex-col items-center rounded-[3.2rem] bg-white dark:bg-gray-800 xl:flex-row">
        <div className="flex flex-initial items-center justify-center md:items-start xl:w-[40%]">
          <img
            src={gemDetails?.image && urlFor(gemDetails.image).url()}
            className="rounded-b-lg rounded-t-3xl dark:opacity-70"
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
