"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

 // Load data from localStorage on initial load
 useEffect(() => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    setData(JSON.parse(storedData));
  }
}, []);

// Save data to localStorage whenever it changes
useEffect(() => {
  if (data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }
}, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
