import React, { useState, useEffect } from "react";

const YourComponent = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const readJsonData = () => {
      // Read JSON data from localStorage
      const data = localStorage.getItem("jsonData");

      if (data) {
        setJsonData(JSON.parse(data));
      }
    };

    readJsonData();
  }, []);

  const updateJsonData = () => {
    if (jsonData) {
      // Update the data (for example, increment the age)
      const updatedData = { ...jsonData, age: jsonData.age + 1 };

      // Save the updated data back to localStorage
      localStorage.setItem("jsonData", JSON.stringify(updatedData));

      // Update the state
      setJsonData(updatedData);
    }
  };

  if (!jsonData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{jsonData.name}</h1>
      <p>Age: {jsonData.age}</p>
      <p>City: {jsonData.city}</p>
      <button onClick={updateJsonData}>Update Age</button>
    </div>
  );
};

export default YourComponent;
