import { useRef } from 'react';

const Slider = ({ title, children }) => {
  const containerRef = useRef(null);
  const scroll = (offset) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };
  return (
    <div className="mb-6">
      {title && <h2 className="text-xl mb-2">{title}</h2>}
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 px-2 z-10"
          onClick={() => scroll(-300)}
        >
          &#8249;
        </button>
        <div
          ref={containerRef}
          className="overflow-x-auto flex gap-4 pb-2"
        >
          {children}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 px-2 z-10"
          onClick={() => scroll(300)}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Slider;
