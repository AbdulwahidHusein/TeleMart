'use client'

import HomePage from '../pages/front/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
import { updateProfile } from '../redux/store'; 

// Ensures WebApp is ready to use
WebApp.ready();

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photos?: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state: { profile: UserData }) => state.profile);

  useEffect(() => {
    // Check if WebApp user data is available
    if (WebApp.initDataUnsafe.user) {
      const user: UserData = WebApp.initDataUnsafe.user as UserData;

      // Dispatch the updateProfile action with user data
      dispatch(updateProfile({
        first_name: user.first_name,
        last_name: user.last_name,
        tg_id: user.id,
        additionalFields: {
          username: user.username,
          language_code: user.language_code,
          is_premium: user.is_premium,
          photos: user.photos,
        },
      }));
    }
  }, [dispatch]);

  return <HomePage />;
}
