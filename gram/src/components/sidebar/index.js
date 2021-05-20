import { memo } from 'react';
import useUser from '../../hooks/use-user';
import Suggestions from './suggestions';
import User from './user';

const Sidebar = () => {
  // eslint-disable-next-line prettier/prettier
  const { user:{ docId, username, fullName, userId, following }} = useUser();
  // const x = useUser();

  // console.log(x);

  console.log(username);
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
};

export default memo(Sidebar);

Sidebar.whyDidYouRender = true;
