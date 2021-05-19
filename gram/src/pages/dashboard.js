import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'OG gram';
  }, []);

  return (
    <div className="bg-grey-background">
      <Header />
      <div className="grid grid-cols-5 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
