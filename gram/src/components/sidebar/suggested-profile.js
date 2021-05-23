import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase';

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    // firebase : create 2 services (functions)
    // update the following array of the loggedin user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // updata the folowers array of the user who ha been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm"> {username} </p>
        </Link>
      </div>

      <div>
        <button
          className="text-sm focus:outline-none   font-bold text-blue-medium "
          type="button"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profileDocId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
};
