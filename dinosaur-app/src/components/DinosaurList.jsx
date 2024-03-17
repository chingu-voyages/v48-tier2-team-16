import React, { useState, useEffect } from "react";
import axios from "axios";

const DinosaurList = () => {
  const [originalDinos, setOriginalDinos] = useState([]);
  const [dinosaurs, setDinosaurs] = useState([]);
  const [formData, setFormData] = useState({
    dinoName: "",
    country: "",
    diet: "",
    weightMin: 0,
    weightMax: 70000,
    lengthMin: 0,
    lengthMax: 35,
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
    const {
      dinoName,
      diet,
      country,
      weightMin,
      weightMax,
      lengthMin,
      lengthMax,
    } = formData;
    let tempDinos = originalDinos
      .filter(
        (dino) =>
          (dino.weight >= weightMin && dino.weight <= weightMax) ||
          dino.weight === "N/A"
      )
      .filter(
        (dino) =>
          (dino.length >= lengthMin && dino.length <= lengthMax) ||
          dino.length === "N/A"
      );

    // .sort((a, b) => a.length - b.length);  ///keep this for sort by length ascending
    if (dinoName) {
      tempDinos = tempDinos.filter((dino) => dino.name === dinoName);
    }
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
        setOriginalDinos(response.data);
        setDinosaurs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <form className="container mt-4">
        <h5>Search Dinosaurs by:</h5>
        <label htmlFor="dino-name">Dinosaur Name</label>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="name"
            name="dinoName"
            onChange={handleChange}
            id="dino-name"
            value={formData.dinoName}
          />
        </div>
        <label htmlFor="country">Found In</label>

        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            name="country"
            id="country"
            placeholder="country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <label htmlFor="diet">Diet</label>
        <div className="input-group mb-3">
          <input
            className="form-control"
            list="diets"
            placeholder="diet"
            name="diet"
            onChange={handleChange}
            id="diet"
            value={formData.diet}
          />
        </div>
        <datalist id="diets">
          <option value="omnivorous"></option>
          <option value="herbivorous"></option>
          <option value="carnivorous"></option>
        </datalist>

        {/************************ WEIGHT SLIDERS ******************************/}

        <label className="form-label" htmlFor="weight-max">
          Choose a maximum weight: {formData.weightMax}
        </label>

        <input
          className="form-range"
          type="range"
          name="weightMax"
          id="weight-max"
          min="0"
          max="70000"
          step="500"
          value={formData.weightMax}
          onChange={handleChange}
        />

        <label htmlFor="weight-min">
          Choose a minimum weight: {formData.weightMin}
        </label>

        <input
          className="form-range"
          type="range"
          name="weightMin"
          id="weight-min"
          min="0"
          max="70000"
          step="500"
          value={formData.weightMin}
          onChange={handleChange}
        />

        {/************************ LENGTH SLIDERS ******************************/}

        <label className="form-label" htmlFor="weight-max">
          Choose a maximum length: {formData.lengthMax}
        </label>

        <input
          className="form-range"
          type="range"
          name="lengthMax"
          id="length-max"
          min="0"
          max="35"
          step="1"
          value={formData.lengthMax}
          onChange={handleChange}
        />

        <label className="form-label" htmlFor="length-min">
          Choose a minimum length: {formData.lengthMin}
        </label>

        <input
          className="form-range"
          type="range"
          name="lengthMin"
          id="length-min"
          min="0"
          max="35"
          step="1"
          value={formData.lengthMin}
          onChange={handleChange}
        />

        <button className="btn btn-primary" onClick={updateDinoList}>
          Search
        </button>
      </form>
      {/************************ DINO CARDS ******************************/}
      <div className="container mt-4">
        <hr />
        <p className="h5 mb-3 mt-3">
          {dinosaurs.length}{" "}
          {dinosaurs.length === 1 ? " dinosaur " : " dinosaurs "} matched your
          search criteria
        </p>
        <hr />
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
                      style={{ backgroundColor: "#e4f7e4" }}
                    >
                      Weight: {dinosaur.weight}{" "}
                      {Number.isInteger(dinosaur.weight) ? "kg" : ""}
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
    </>
  );
};

export default DinosaurList;
