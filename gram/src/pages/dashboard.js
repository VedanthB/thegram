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
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
