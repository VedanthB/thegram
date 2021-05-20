import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      console.log('following', following);
      // does the user actually follow people?
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
    }

    console.log(userId);
    getTimelinePhotos();
  }, []);

  return { photos };
}