import React, { useState, useEffect } from "react";

export default function DinosaurList({
  currentCards,
  filteredDinos,
  clearSearch,
}) {
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
}
