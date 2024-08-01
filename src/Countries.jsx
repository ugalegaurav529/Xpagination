import { useEffect, useState } from "react";

const CountryCard = ({ name, flag, altText }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2px",
        border: "1px solid black",
        borderRadius: "8px",
        height: "100px",
        width: "100px",
        margin: "10px auto ",
        padding: "10px",
      }}
    >
      <img
        src={flag}
        alt={altText}
        style={{
          width: "50px",
          height: "50px",
        }}
      />
      <h2 style={{ textAlign: "center", fontSize: "0.9rem" }}>{name}</h2>
    </div>
  );
};

const API_URL = "https://xcountries-backend.azurewebsites.net/all";

function Countries() {
  const [countries, setCountries] = useState([]);
  // const temp = [1, 2, 3, 4, 5,6];
  useEffect(() => {
    //fetch data
    const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        const jsonRes = await response.json();
        setCountries(jsonRes);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {countries.map((country) => (
        <CountryCard
          key={country.abbr}
          name={country.name}
          flag={country.flag}
          altText={country.abbr}
        />
      ))}
    </div>
  );
}
export default Countries;
