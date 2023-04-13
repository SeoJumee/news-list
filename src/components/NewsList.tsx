import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import { NewsType } from './NewsItem';
import { useParams } from 'react-router-dom';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const sampleArticle = {
  title: '제목',
  description: '내용',
  url: 'https://google.com',
};

interface NewListProps {
  category: string;
}

function NewsList() {
  const [articles, setArticles] = useState<NewsType[]>([] as NewsType[]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const query =
          (category ?? 'all') === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  // 대기 중일 때
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  // 아직 articles 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }
  console.log(category);
  return (
    <NewsListBlock>
      {articles.map((item, index) => (
        <NewsItem
          key={index}
          title={item.title}
          description={item.description}
          url={item.url}
        />
      ))}
    </NewsListBlock>
  );
}

export default NewsList;
