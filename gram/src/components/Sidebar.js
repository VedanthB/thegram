import useUser from '../hooks/use-user';

export default function Sidebar() {
  const { user: { fullName, username, userId } } = useUser();

  return (
    <div className="p-4">
      <User />
      <Suggestion />
    </div>
  );
}
