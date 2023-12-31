import { useEffect, useState } from 'react';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/api';
import MasonryLayout from '../components/ui/MasonryLayout';
import Spinner from '../components/ui/Spinner';
import { Helmet } from 'react-helmet-async';

function Search({ searchTerm }) {
  const [gems, setGems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setGems(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(true);
      client.fetch(feedQuery).then((data) => {
        setGems(data);
        setIsLoading(false);
      });
    }
  }, [searchTerm]);

  if (isLoading)
    return (
      <div className="flex h-[70vh] md:h-[80vh]">
        <Spinner message="Searching for gems..." />
      </div>
    );

  if (!gems?.length && searchTerm !== '')
    return (
      <h2 className="mt-10 text-center text-xl dark:text-gray-300">
        No gems found
      </h2>
    );

  return (
    <>
      <Helmet>
        <title>EcoGems</title>
      </Helmet>

      <MasonryLayout gems={gems} />
    </>
  );
}

export default Search;
