import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DinosaurList = () => {
  const [dinosaurs, setDinosaurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://chinguapi.onrender.com/dinosaurs');
        setDinosaurs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {dinosaurs.map((dinosaur) => (
          <div key={dinosaur.id} className="col-md-4 mb-4">
            <div className="card" style={{ padding: '4px', backgroundColor: '#e1f1e1', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)' }}>
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
        ))}
      </div>
    </div>
  );
};

export default DinosaurList;