
import React, { useState, useEffect } from "react";
import axios from "axios";
import MapBig from "./components/MapBig";
import SearchForm from "./components/SearchForm";
import Pagination from "./components/Pagination";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DinosaurProvider } from "./context/DinosaurContext";
import DinosaurList from './components/DinosaurList';
import DinosaurDetails from './components/DinosaurDetails';


import "./styles.css";

export default function App() {
  //state variables////////////////////////////////////
  const [dinosaurs, setDinosaurs] = useState([]);
  const [geocodes, setGeocodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);
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

  //api calls in useEffect/////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://chinguapi.onrender.com/dinosaurs"
        );
        setDinosaurs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchGeocodes = async () => {
      var requestOptions = {
        method: "GET",
      };
      const countriesArr = [];
      //create array of all countries including duplicates
      dinosaurs.forEach((dino) => {
        countriesArr.push(...dino.foundIn.split(", "));
      });
      //create array of unique countries
      const countries = [...new Set(countriesArr)];
      const geoPromises = countries.map((country) => {
        return fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${country}&format=json&apiKey=${
            import.meta.env.VITE_GEOAPIFY_API_KEY
          }`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            return {
              country,
              lat: result.results[0].lat,
              lon: result.results[0].lon,
            };
          })
          .catch((error) => console.log("error", error));
      });
      const countryAndCodes = await Promise.all(geoPromises);
      setGeocodes(countryAndCodes);
    }; //end fetchGeocodes
    if (dinosaurs.length === 0) return;
    fetchGeocodes();
  }, [dinosaurs]);

  //functions////////////////////////////////////////////////
  const passBackCountry = (e) => {
    setFormData((currForm) => {
      return {
        ...currForm,
        country: e.target.options.children.props.children[3],
      };
    });
  };

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
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredDinos.slice(indexOfFirstCard, indexOfLastCard);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (

    <>
      <SearchForm handleChange={handleChange} formData={formData} />
      <MapBig
        dinosaurs={dinosaurs}
        geocodes={geocodes}
        handleChange={handleChange}
        passBackCountry={passBackCountry}
      />
      <DinosaurList
        currentCards={currentCards}
        filteredDinos={filteredDinos}
        clearSearch={clearSearch}
      />
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={filteredDinos.length}
        paginate={paginate}
      />
    </>

    <Router>
      <DinosaurProvider>
        <Routes>
          <Route path="/" element={<DinosaurList />} />
          <Route path="details/:id" element={<DinosaurDetails />} />
        </Routes>
      </DinosaurProvider>
    </Router>

  );
}
