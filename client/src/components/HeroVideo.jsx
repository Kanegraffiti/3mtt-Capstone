export default function HeroVideo() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <video
        src="/hero_bg.mp4"
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Find Your Next Favorite Movie
        </h1>
        <p className="max-w-xl mb-6">
          Explore top-rated movies, build your watchlists and share with friends.
        </p>
      </div>
    </section>
  );
}
