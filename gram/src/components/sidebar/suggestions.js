import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';

export default function Suggestions({ userId, following }) {
  const [profiles, setProfiles] = useState(null);

  // go ahead and get the suggested profiles using a firebase service (call using userId
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    // eslint-disable-next-line prettier/prettier

    if (userId) {
      suggestedProfiles();
    }

    console.log('--->', profiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, following]);

  return !profiles ? (
    <Skeleton cout={1} height={150} className="mt-5" />
  ) : (
    profiles?.length >
    (
      <div className="rounded flex flex-col">
        <div className="text-sm flex items-center align-items justify-between mb-2 ">
          <p className="font-bold text-grey-base"> Suggestions for you! </p>
        </div>
      </div>
    )
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array
};
