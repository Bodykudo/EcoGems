import { useEffect, useState } from 'react';
import { client } from '../../client';
import { userCreatedGemsQuery, userSavedGemsQuery } from '../../utils/api';
import MasonryLayout from '../ui/MasonryLayout';

function ProfileGems({ text, userId }) {
  const [gems, setGems] = useState([]);

  useEffect(() => {
    if (text === 'Created') {
      const createdGemsQuery = userCreatedGemsQuery(userId);
      client.fetch(createdGemsQuery).then((data) => {
        setGems(data);
      });
    } else {
      const savedGemsQuery = userSavedGemsQuery(userId);
      client.fetch(savedGemsQuery).then((data) => {
        setGems(data);
      });
    }
  }, [userId, text]);

  return (
    <div className="px-2">
      {gems?.length ? (
        <MasonryLayout gems={gems} />
      ) : (
        <p className="mt-2 flex w-full items-center justify-center text-xl font-bold">
          No gems to show at the moment
        </p>
      )}
    </div>
  );
}

export default ProfileGems;
