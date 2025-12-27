import { useState, useEffect } from "react";
import countryService from "./services/country";
import Countries from "./components/Countries";

function App() {
  const [filterText, setFilterText] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <>
      <div>
        <p>
          find countries{" "}
          <input
            type="text"
            onChange={handleFilterTextChange}
            value={filterText}
          />
        </p>
      </div>
      <Countries text={filterText} countries={countries} />
    </>
  );
}

export default App;
