import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { client } from '../client';
import { fetchUser } from '../utils/fetchUser';
import shareVideo from '../assets/video.mp4';
import logo from '../assets/logo1.png';
import { Helmet } from 'react-helmet-async';

function Login({}) {
  const navigate = useNavigate();

  const user = fetchUser();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, []);

  function handleLogin(response) {
    const userData = jwtDecode(response.credential);
    localStorage.setItem('user', JSON.stringify(userData));
    const { name, email, picture, sub: userId } = userData;

    const doc = {
      _id: userId,
      _type: 'user',
      userName: name,
      email: email,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/');
      window.location.reload(true);
    });
  }

  return (
    <>
      <Helmet>
        <title>EcoGems - {gemDetails?.title}</title>
      </Helmet>

      <div className="flex h-screen flex-col items-center justify-start">
        <div className="relative h-full w-full">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-blackOverlay">
            <div className="p-5">
              <img src={logo} className="w-80" alt="logo" />
            </div>
            <div className="shadow-2xl">
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => console.log('Error happened.')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
