// import { useEffect, useState } from 'react';

// const CountryCard = ({ name, flag, altText }) => {
//   return (
//     <div
//       className="countryCard"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "2px",
//         border: "1px solid black",
//         borderRadius: "8px",
//         height: "120px",
//         width: "120px",
//         margin: "10px",
//         padding: "10px",
//         boxSizing: "border-box",
//       }}
//     >
//       <img
//         src={flag}
//         alt={altText}
//         style={{
//           width: "80px",
//           height: "60px",
//         }}
//       />
//       <h2 style={{ textAlign: "center", fontSize: "0.9rem" }}>{name}</h2>
//     </div>
//   );
// };

// const API_URL = 'https://restcountries.com/v3.1/all';

// function Countries() {
//   const [countries, setCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCountries, setFilteredCountries] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         setCountries(data);
//         setFilteredCountries(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const results = countries.filter(country =>
//         country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredCountries(results);
//     } else {
//       setFilteredCountries(countries);
//     }
//   }, [searchTerm, countries]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <input
//         type="text"
//         placeholder="Search for a country"
//         value={searchTerm}
//         onChange={handleSearch}
//         style={{
//           width: "100%",
//           maxWidth: "400px",
//           padding: "10px",
//           fontSize: "16px",
//           marginBottom: "20px",
//           border: "1px solid #ddd",
//           borderRadius: "4px",
//         }}
//       />
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//         }}
//       >
//         {filteredCountries.length > 0 ? (
//           filteredCountries.map((country) => (
//             <CountryCard
//               key={country.cca3}
//               name={country.name.common}
//               flag={country.flags.png}
//               altText={country.name.common}
//             />
//           ))
//         ) : (
//           <p>No countries found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Countries;




import React, { useState, useEffect } from 'react';
import './style.css';

function EmployeeDataTable() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage === totalPages ? employees.length : currentPage * 10;
  const displayedEmployees = employees.slice(startIndex, endIndex);

  return (
    <div className="employee-data-table">
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeDataTable;