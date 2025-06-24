import { Link } from 'react-router-dom';
import { HiHome, HiBookmark, HiUser } from 'react-icons/hi';

export default function MobileDrawer({ close }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-40 flex justify-end md:hidden">
      <div className="w-64 bg-gradient-to-b from-brand-from to-brand-to h-full p-4 space-y-4">
        <button onClick={close} className="text-right w-full">Close</button>
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <HiHome /> Home
        </Link>
        <Link to="/library" className="flex items-center gap-2" onClick={close}>
          <HiBookmark /> Watchlist
        </Link>
        <Link to="/profile" className="flex items-center gap-2" onClick={close}>
          <HiUser /> Profile
        </Link>
      </div>
    </div>
  );
}
