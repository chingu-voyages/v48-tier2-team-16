import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDinosaurContext } from '../context/DinosaurContext';

const DinosaurDetails = () => {
  const { dinosaurs } = useDinosaurContext();    
  const { id } = useParams();
  const dinosaur = dinosaurs.find(dino => dino.id === parseInt(id));
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${dinosaur.name}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        setNews(response.data.articles.slice(0, 2));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [dinosaur.name]);

  return (
    <div className="container mt-4">
      <div className="card">
        <img src={dinosaur.imageSrc} className="card-img-top" alt={dinosaur.name} />
        <div className="card-body">
          <h4 className="card-title" style={{ textDecoration: 'underline' }}>{dinosaur.name}</h4>
          <p className="card-text">{dinosaur.description}</p>
          <ul className="list-group" style={{ border: '2px solid #b4eac8' }}>
            <li className="list-group-item" style={{ backgroundColor: '#eafaea' }}>Type: {dinosaur.typeOfDinosaur}</li>
            <li className="list-group-item" style={{ backgroundColor: '#e4f7e4' }}>Length: {dinosaur.length} meters</li>
            <li className="list-group-item" style={{ backgroundColor: '#eafaea' }}>Diet: {dinosaur.diet}</li>
            <li className="list-group-item" style={{ backgroundColor: '#e4f7e4' }}>When Lived: {dinosaur.whenLived}</li>
            <li className="list-group-item" style={{ backgroundColor: '#eafaea' }}>Found In: {dinosaur.foundIn}</li>
          </ul>
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} style={{ border: '1px solid #000' }}>
                <h5>{article.title}</h5>
                <p>{new Date(article.publishedAt).toLocaleString('en-CA', { dateStyle: 'short', hour12: false, timeStyle: 'short' })}</p>
                <p>Source: {article.source.name}</p>
                <p>Author: {article.author}</p>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                <a href={article.url} className="btn btn-link btn-sm">Read more</a>
              </div>
            ))
          ) : (
            <p>{"Sorry, we couldn't find any news articles about " + dinosaur.name + "."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DinosaurDetails;
