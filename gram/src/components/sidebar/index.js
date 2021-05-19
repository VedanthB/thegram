import useUser from '../../hooks/use-user';
import Suggestion from './suggestions';
import User from './user';

export default function Sidebar() {
  // eslint-disable-next-line prettier/prettier
  const { user:{ username, fullName, userId }} = useUser();
  // const x = useUser();

  // console.log(x);

  console.log(username);
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestion userId={userId} />
    </div>
  );
}
