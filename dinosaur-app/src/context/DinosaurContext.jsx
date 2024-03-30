import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DinosaurContext = createContext();
export const useDinosaurContext = () => useContext(DinosaurContext);

export const DinosaurProvider = ({ children }) => {
  const [dinosaurs, setDinosaurs] = useState([]);
  
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
    <DinosaurContext.Provider value={{ dinosaurs, setDinosaurs }}>
      {children}
    </DinosaurContext.Provider>
  );
};
