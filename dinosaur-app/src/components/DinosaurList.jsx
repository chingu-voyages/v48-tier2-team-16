import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDinosaurContext } from "../context/DinosaurContext";


const DinosaurList = () => {
  const { dinosaurs } = useDinosaurContext();
  const [formData, setFormData] = useState({
    dinoName: "",
    country: "",
    diet: "",
    weightMin: 0,
    weightMax: 70000,
    lengthMin: 0,
    lengthMax: 40,
    sortBy: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const changedField = e.target.name;
    const newValue = e.target.value;
    setFormData((currForm) => {
      return { ...currForm, [changedField]: newValue };
    });
  };

  const clearSearch = () => {
    setFormData({
      dinoName: "",
      country: "",
      diet: "",
      weightMin: 0,
      weightMax: 70000,
      lengthMin: 0,
      lengthMax: 40,
      sortBy: "",
    });
  };
  const {
    dinoName,
    diet,
    country,
    weightMin,
    weightMax,
    lengthMin,
    lengthMax,
    sortBy,
  } = formData;

  let filteredDinos = dinosaurs
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

  if (dinoName) {
    filteredDinos = filteredDinos.filter((dino) =>
      dino.name.toLowerCase().startsWith(dinoName.toLowerCase())
    );
  }
  if (diet) {
    filteredDinos = filteredDinos.filter((dino) => dino.diet === diet);
  }
  if (country) {
    filteredDinos = filteredDinos.filter((dino) =>
      dino.foundIn.split(", ").includes(country)
    );
  }
  let tempNums = [];
  let tempNAs = [];
  switch (sortBy) {
    case "lengthAsc":
      tempNums = filteredDinos.filter((dino) => dino.length !== "N/A");
      tempNAs = filteredDinos.filter((dino) => dino.length === "N/A");
      filteredDinos = [
        ...tempNums.sort((a, b) => a.length - b.length),
        ...tempNAs,
      ];
      break;
    case "lengthDesc":
      tempNums = filteredDinos.filter((dino) => dino.length !== "N/A");
      tempNAs = filteredDinos.filter((dino) => dino.length === "N/A");
      filteredDinos = [
        ...tempNums.sort((a, b) => b.length - a.length),
        ...tempNAs,
      ];
      break;
    case "weightAsc":
      tempNums = filteredDinos.filter((dino) => dino.weight !== "N/A");
      tempNAs = filteredDinos.filter((dino) => dino.weight === "N/A");
      filteredDinos = [
        ...tempNums.sort((a, b) => a.weight - b.weight),
        ...tempNAs,
      ];
      break;
    case "weightDesc":
      tempNums = filteredDinos.filter((dino) => dino.weight !== "N/A");
      tempNAs = filteredDinos.filter((dino) => dino.weight === "N/A");
      filteredDinos = [
        ...tempNums.sort((a, b) => b.weight - a.weight),
        ...tempNAs,
      ];
      break;
    case "country":
      filteredDinos = filteredDinos.sort((a, b) =>
        a.foundIn.localeCompare(b.foundIn)
      );

      break;
    case "diet":
      filteredDinos = filteredDinos.sort((a, b) =>
        a.diet.localeCompare(b.diet)
      );
      break;
    default:
  }

  return (
    <>
      {/******** SEARCH SUMMARY & SORTING **************/}
      <div className="container mt-4">
        <hr />
        <div className="row">
          <div className="col-md-9">
            <p id="search-results" className="h5">
              {filteredDinos.length}{" "}
              {filteredDinos.length === 1 ? " dinosaur " : " dinosaurs "}{" "}
              matched your search criteria
            </p>
          </div>
          <div className="col-md-3">
            <button className="btn btn-secondary" onClick={clearSearch}>
              Clear search
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          {/************************ DINO CARDS ***************/}
          {currentCards.map((dinosaur) => (
            <div key={dinosaur.id} className="col-md-4 mb-4">
              <Link to={`details/${dinosaur.id}`}>
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
