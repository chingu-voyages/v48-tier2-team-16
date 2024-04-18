import React, { useState, useEffect } from "react";
import axios from "axios";

import dinoData from "./dinoData"; //this replaces slow chingu API
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DinosaurProvider } from "./context/DinosaurContext";
import DinosaurList from "./components/DinosaurList";
import DinosaurDetails from "./components/DinosaurDetails";
import MapBig from "./components/MapBig";
import SearchForm from "./components/SearchForm";
import Pagination from "./components/Pagination";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./styles.css";
import Header from "./components/Header";
import { FaAlignRight } from "react-icons/fa";

function App() {
  //state variables////////////////////////////////////
  const [dinosaurs, setDinosaurs] = useState(dinoData);
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

  // api calls in useEffect/////////////////////////////////
  // api call commented out due to slow chingu api ////////
  // instead, dinoData is imported from dinoData.js ///////

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://chinguapi.onrender.com/dinosaurs"
  //       );
  //       setDinosaurs(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
  }, []);

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
    e.preventDefault?.();
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
  //chart data////////////////////////////////////////////////////////////
  Chart.register(ChartDataLabels);
  ChartJS.register(ArcElement, Tooltip, Legend);

  let carnivoreCount = 0;
  let herbivoreCount = 0;
  let omnivoreCount = 0;
  filteredDinos.forEach((dino) => {
    if (dino.diet === "carnivorous") {
      carnivoreCount += 1;
    }
    if (dino.diet === "herbivorous") {
      herbivoreCount += 1;
    }
    if (dino.diet === "omnivorous") {
      omnivoreCount += 1;
    }
  });
  const dietData = {
    labels: ["Carnivorous", "Herbivorous", "Omnivorous"],
    datasets: [
      {
        label: "Dinosaur Diet",
        data: [carnivoreCount, herbivoreCount, omnivoreCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      datalabels: {
        anchor: "right",
        align: "end",
        formatter: (value, ctx) => {
          const totalSum = ctx.dataset.data.reduce((acc, curr) => {
            return acc + curr;
          }, 0);
          return value > 0 ? ((value / totalSum) * 100).toFixed(1) + "%" : "";
        },
      },
      legend: {
        position: "right",
      },
    },
  };

  //pagination variables///////////////////////////////////////////////////
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredDinos.slice(indexOfFirstCard, indexOfLastCard);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Header />
      <Router>
        <DinosaurProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchForm handleChange={handleChange} formData={formData} />
                  <div className="container col-md-12 mb-4 ">
                    <div className="container row">
                      <div className="container col-md-8">
                        <MapBig
                          dinosaurs={dinosaurs}
                          geocodes={geocodes}
                          handleChange={handleChange}
                          passBackCountry={passBackCountry}
                        />
                      </div>
                      <div className="col-md-4">
                        <p className="h5 mt-5 text-center mb-0">
                          {" "}
                          Dinosaurs by Diet
                        </p>
                        <Pie data={dietData} options={options} />
                      </div>
                    </div>
                  </div>
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
              }
            />
            <Route
              path="details/:id"
              element={<DinosaurDetails geocodes={geocodes} />}
            />
          </Routes>
        </DinosaurProvider>
      </Router>
    </div>
  );
}

export default App;
