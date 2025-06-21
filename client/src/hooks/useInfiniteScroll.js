import { useEffect } from 'react';

export default function useInfiniteScroll({ loader, hasMore, loadMore }) {
  useEffect(() => {
    if (!loader.current || !hasMore) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    });
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader, hasMore, loadMore]);
}
