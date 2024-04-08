import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDinosaurContext } from "../context/DinosaurContext";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import backupImgUrl from "../img/dino-backup-img.png";

const DinosaurDetails = ({ geocodes }) => {
  const { dinosaurs } = useDinosaurContext();
  const { id } = useParams();
  const dinosaur = dinosaurs.find((dino) => dino.id === parseInt(id));
  const [news, setNews] = useState([]);
  const dinoIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/5458/5458405.png",
    iconSize: [38, 38],
  });

  const geocodesFixEngland = geocodes.map((country) => {
    if (country.country === "England") {
      return {
        ...country,
        lon: -1.2649062,
        lat: 52.5310214,
      };
    }
    return country;
  });

  const dinoMarkers = [];

  dinosaur.foundIn.split(", ").forEach((countryFound) => {
    geocodesFixEngland.forEach((country) => {
      if (countryFound === country.country) {
        dinoMarkers.push(
          <Marker
            position={[country.lat, country.lon]}
            icon={dinoIcon}
            key={country.country}
          >
            <Popup>{country.country}</Popup>
          </Marker>
        );
      } //end if
    });
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${dinosaur.name}&apiKey=${
            import.meta.env.VITE_THE_NEWS_API_KEY
          }`
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
        <img
          src={dinosaur.imageSrc === "N/A" ? backupImgUrl : dinosaur.imageSrc}
          className="card-img-top"
          alt={dinosaur.name}
        />
        <div className="card-body">
          <h4 className="card-title" style={{ textDecoration: "underline" }}>
            {dinosaur.name}
          </h4>
          <p className="card-text">{dinosaur.description}</p>
          <ul className="list-group" style={{ border: "2px solid #b4eac8" }}>
            <li
              className="list-group-item"
              style={{ backgroundColor: "#eafaea" }}
            >
              Type: {dinosaur.typeOfDinosaur}
            </li>
            <li
              className="list-group-item"
              style={{ backgroundColor: "#e4f7e4" }}
            >
              Length: {dinosaur.length} meters
            </li>
            <li
              className="list-group-item"
              style={{ backgroundColor: "#eafaea" }}
            >
              Diet: {dinosaur.diet}
            </li>
            <li
              className="list-group-item"
              style={{ backgroundColor: "#e4f7e4" }}
            >
              When Lived: {dinosaur.whenLived}
            </li>
            <li
              className="list-group-item"
              style={{ backgroundColor: "#eafaea" }}
            >
              Found In: {dinosaur.foundIn}
            </li>
          </ul>
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} style={{ border: "1px solid #000" }}>
                <h5>{article.title}</h5>
                <p>
                  {new Date(article.publishedAt).toLocaleString("en-CA", {
                    dateStyle: "short",
                    hour12: false,
                    timeStyle: "short",
                  })}
                </p>
                <p>Source: {article.source.name}</p>
                <p>Author: {article.author}</p>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                <a href={article.url} className="btn btn-link btn-sm">
                  Read more
                </a>
              </div>
            ))
          ) : (
            <p>
              {"Sorry, we couldn't find any news articles about " +
                dinosaur.name +
                "."}
            </p>
          )}
          <div className="container mt-4">
            <MapContainer
              className="leaflet-container"
              center={[30, 30]}
              zoom={2}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {dinoMarkers}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinosaurDetails;
