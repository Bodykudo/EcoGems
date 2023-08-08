import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { userQuery } from '../utils/api';
import { fetchUser } from '../utils/fetchUser';
import Banner from '../components/profile/Banner';
import ProfileNav from '../components/profile/ProfileNav';
import ProfileGems from '../components/profile/ProfileGems';
import Spinner from '../components/ui/Spinner';
import { Helmet } from 'react-helmet-async';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [text, setText] = useState('Created');
  const [activeButton, setActiveButton] = useState('created');
  const { userId } = useParams();
  const user = fetchUser();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUserData(data[0]);
    });
  }, [userId]);

  if (!userData)
    return (
      <div className="flex h-[90vh] md:h-[95vh]">
        <Spinner message="Loading User Profile..." />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>EcoGems - {userData?.userName}</title>
        <meta property="og:title" content={`${userData?.userName} - EcoGems`} />
        <meta
          property="og:url"
          content={`https://ecogems.vercel.app/${userId}`}
        />
        <meta property="og:image" content={userData?.image} />
      </Helmet>

      <div className="relative h-full items-center justify-center pb-2">
        <div className="flex flex-col pb-5">
          <div className="relative mb-7 flex flex-col">
            <Banner user={user} userData={userData} userId={userId} />

            <ProfileNav
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              setText={setText}
            />

            <ProfileGems text={text} userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
