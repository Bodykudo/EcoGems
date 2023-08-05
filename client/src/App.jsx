import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { client } from './client';
import { userQuery } from './utils/api';
import { fetchUser } from './utils/fetchUser';

import AppLayout from './components/layout/AppLayout';
import Login from './routes/Login';
import Feed from './routes/Feed';
import Search from './routes/Search';
import UserProfile from './routes/UserProfile';
import PageNotFound from './routes/PageNotFound';
import GemDetails from './routes/GemDetails';
import CreateGem from './routes/CreateGem';

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <Routes>
        <Route
          element={
            <AppLayout
              user={user}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        >
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/gem-detail/:gemId"
            element={<GemDetails user={user && user} />}
          />
          {user && (
            <Route
              path="/create-gem"
              element={<CreateGem user={user && user} />}
            />
          )}
          <Route path="/search" element={<Search searchTerm={searchTerm} />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
