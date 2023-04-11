import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NewsPage from '../pages/NewsPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:category?" element={<NewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
