import React, { useCallback, useState } from 'react';
import NewsList from '../components/NewsList';
import Categories from '../components/Categories';

function NewsPage() {
  const [category, setCategory] = useState<string>('all');
  const onSelect = useCallback((category: string) => setCategory(category), []);
  return (
    <>
      <Categories category={category} onSelect={onSelect} />
      <NewsList />
    </>
  );
}

export default NewsPage;
