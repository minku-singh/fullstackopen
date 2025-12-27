import React from "react";
import { useEffect } from "react";
import countryService from "../services/country";
import { useState } from "react";

const Country = ({ country }) => {
  console.log(country);

  const [countryData, setCountryData] = useState("");

  useEffect(() => {
    countryService.getCountry(country).then((res) => {
      console.log(res.data);

      setCountryData(res.data);
    });
  }, [country]);

  if (!countryData) {
    return null;
  }

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <div>
        <p>Capital {countryData.capital[0]}</p>
        <p>Area {countryData.area}</p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={countryData.flags.png} alt="flag" />
    </div>
  );
};

export default Country;
