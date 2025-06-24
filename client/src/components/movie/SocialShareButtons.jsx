const SocialShareButtons = ({ movie }) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out ${movie.title}`);
  return (
    <div className="flex space-x-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Facebook
      </a>
    </div>
  );
};
export default SocialShareButtons;
