import React from "react";
import Country from "./Country";
import { useState } from "react";

const Countries = ({ text, countries }) => {
  const [showCountry, setShowCountry] = useState(false);
  const [countryName, setCountryName] = useState("");

  if (!text) {
    return <p>Please search a country!</p>;
  }

  let matchedCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(text.toLowerCase())
  );

  if (matchedCountries.length === 1) {
    return <Country country={matchedCountries[0].name.common} />;
  }

  const handleShowClick = (countryName) => {
    setShowCountry(true);
    setCountryName(countryName);
  };

  if (showCountry) {
    return <Country country={countryName} />;
  }

  return (
    <div>
      {matchedCountries.length > 10 ? (
        <>Too many matches, apply more filter</>
      ) : (
        matchedCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleShowClick(country.name.common)}>
              show
            </button>
          </p>
        ))
      )}
    </div>
  );
};

export default Countries;
