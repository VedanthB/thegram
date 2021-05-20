import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';

export default function Timeline() {
  const { photos } = usePhotos();

  return (
    <div className="container col-span-2">
      <p>timeline</p>
    </div>
  );
}
