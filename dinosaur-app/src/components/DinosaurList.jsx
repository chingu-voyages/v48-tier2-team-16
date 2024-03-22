import React, { useState, useEffect } from "react";
import axios from "axios";

const DinosaurList = () => {
  const [dinosaurs, setDinosaurs] = useState([]);
  const [formData, setFormData] = useState({
    dinoName: "",
    country: "",
    diet: "",
  });

  const handleChange = (e) => {
    const changedField = e.target.name;
    const newValue = e.target.value;
    setFormData((currForm) => {
      return { ...currForm, [changedField]: newValue };
    });
  };

  const updateDinoList = (e) => {
    e.preventDefault();
    let tempDinos = dinosaurs.map((dino) => dino);
    const { dinoName, diet, country } = formData;
    if (diet) {
      tempDinos = tempDinos.filter((dino) => dino.diet === diet);
    }
    if (country) {
      tempDinos = tempDinos.filter((dino) =>
        dino.foundIn.split(", ").includes(country)
      );
    }
    setDinosaurs(tempDinos);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://chinguapi.onrender.com/dinosaurs"
        );
        setDinosaurs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <div className="aside col-md-12 pb-4 pt-2" style={{ background: "#003f62" }}>
      <form className="container mt-4 text-white">
        <h5>Search Dinosaurs by:</h5>
        <label htmlFor="dino-name">Dinosaur Name</label>
        <input
          type="text"
          placeholder="name"
          name="dino-name"
          onChange={handleChange}
          id="dino-name"
          value={formData.dinoName}
        />
        <label htmlFor="country">Found In</label>
        <input
          type="text"
          name="country"
          id="country"
          placeholder="country"
          onChange={handleChange}
          value={formData.country}
        />
        <label htmlFor="diet">Diet</label>
        <input
          list="diets"
          placeholder="diet"
          name="diet"
          onChange={handleChange}
          id="diet"
          value={formData.diet}
        />
        <datalist id="diets">
          <option value="omnivorous"></option>
          <option value="herbivorous"></option>
          <option value="carnivorous"></option>
        </datalist>
        <button onClick={updateDinoList}>Search</button>
      </form>
      </div>

    <div className="main col-md-12 pt-2" style={{ background: "#8a7356" }}>
      <div className="container mt-4">
        <div className="row">
          {dinosaurs.map((dinosaur) => (
            <div key={dinosaur.id} className="col-md-4 mb-4">
              <div
                className="card"
                style={{
                  padding: "4px",
                  backgroundColor: "#e1f1e1",
                  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={dinosaur.imageSrc}
                  className="card-img-top"
                  alt={dinosaur.name}
                />
                <div className="card-body">
                  <h4
                    className="card-title"
                    style={{ textDecoration: "underline" }}
                  >
                    {dinosaur.name}
                  </h4>
                  {/* <p className="card-text">{dinosaur.description}</p> */}
                  <ul
                    className="list-group"
                    style={{ border: "2px solid #b4eac8" }}
                  >
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default DinosaurList;
