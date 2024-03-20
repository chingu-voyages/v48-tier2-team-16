import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDinosaurContext } from '../context/DinosaurContext';

const DinosaurDetails = () => {
  const { dinosaurs } = useDinosaurContext();    
  const { id } = useParams();
  const dinosaur = dinosaurs.find(dino => dino.id === parseInt(id));
  const [news, setNews] = useState([]);

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
        </div>
      </div>
    </div>
  );
};

export default DinosaurDetails;
