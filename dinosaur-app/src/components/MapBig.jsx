import React, { useState, useEffect, Component } from "react";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

export default function MapBig({ dinosaurs, geocodes, passBackCountry }) {
  const dinoIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/5458/5458405.png",
    iconSize: [38, 38],
  });

  let dinoByCountry = geocodes;
  dinoByCountry.forEach((country) => (country.dinos = []));
  dinoByCountry.forEach((country) => {
    dinosaurs.forEach((dino) => {
      if (dino.foundIn.split(", ").includes(country.country)) {
        country.dinos.push(dino.name);
      }
    });
  });
  //Show dinosaur markers in each country so user can click to populate country dropdown
  const dinoMarkers = [];
  dinoByCountry.forEach((country) => {
    let dinosPopup = "";
    country.dinos.forEach((dino) => (dinosPopup += dino + "\n\n\n"));

    dinoMarkers.push(
      <Marker
        eventHandlers={{
          click: (e) => {
            passBackCountry(e);
          },
        }}
        position={[country.lat, country.lon]}
        icon={dinoIcon}
        key={country.country}
      >
        <Popup>
          {/* {country.dinos} */}
          {dinosPopup}
          <br /> {country.country}
        </Popup>
      </Marker>
    );
  });
  // Show dinosaur markers as a search result/////////////
  // filteredDinos.forEach((dino) => {
  //   dino.foundIn.split(", ").forEach((country) => {
  //     geocodes.forEach((geocode) => {
  //       if (geocode.country === country) {
  //         dinoMarkers.push(
  //           <Marker
  //             // key={dino.id}
  //             onClick={handleChange}
  //             position={[geocode.lat, geocode.lon]}
  //             icon={dinoIcon}
  //           >
  //             <Popup onClick={handleChange}>
  //               {dino.name}
  //               <br /> {country}
  //             </Popup>
  //           </Marker>
  //         );
  //       } //end if
  //     }); //end forEach
  //   });
  // });

  return (
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
  );
}
