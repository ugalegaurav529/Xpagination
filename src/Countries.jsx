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
        height: "120px",
        width: "120px",
        margin: "10px",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={flag}
        alt={altText}
        style={{
          width: "80px",
          height: "60px",
        }}
      />
      <h2 style={{ textAlign: "center", fontSize: "0.9rem" }}>{name}</h2>
    </div>
  );
};

const API_URL = "https://restcountries.com/v3.1/all";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const jsonRes = await response.json();
        setCountries(jsonRes);
        setFilteredCountries(jsonRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          display:"flex",
          justifyItems:"center",
          alignItems:"center",
          margin:"0px auto"
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              name={country.name.common}
              flag={country.flags.png}
              altText={country.name.common}
            />
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default Countries;
