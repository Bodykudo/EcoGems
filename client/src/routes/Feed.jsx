import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/api';
import MasonryLayout from '../components/ui/MasonryLayout';
import Spinner from '../components/ui/Spinner';

function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [gems, setGems] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setGems(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setGems(data);
        setIsLoading(false);
      });
    }
  }, [categoryId]);

  if (isLoading)
    return (
      <div className="flex h-[70vh] md:h-[80vh]">
        <Spinner message="We are adding new gems to your feed!" />
      </div>
    );

  if (!gems?.length)
    return <h2 className="dark:text-gray-300">No gems available</h2>;

  return (
    <div className="dark:text-gray-300">
      {gems.length ? <MasonryLayout gems={gems} /> : 'No data to show'}
    </div>
  );
}

export default Feed;
