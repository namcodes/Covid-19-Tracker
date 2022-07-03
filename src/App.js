import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import numeral from "numeral";

function App() {
  const [country, setCountry] = useState("philippines");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState();

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries/PH")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setFlag(data.countryInfo.flag);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
            cases: country.cases,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "ph"
        ? "https://disease.sh/v3/covid-19/countries/PH"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setFlag(data.countryInfo.flag);
        console.log(data);
      });
  };

  return (
    <>
      <div className="container">
        <section className="container-header">
          <h1>Covid 19 - Tracker</h1>
        </section>
        <section className="container-body">
          <header className="container-body-header">
            <div className="container-header-left">
              <img src={flag} alt="country-flag" />
              <h1>- {countryInfo.country}</h1>
            </div>
            <div>
              <FormControl className="app_dropdown">
                <Select
                  variant="outlined"
                  value={country}
                  onChange={onCountryChange}
                >
                  <MenuItem value="philippines">Philipines</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.name} value={country.value}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </header>
          <div className="container-card">
            <div className="container-left">
              <div className="card covid-cases">
                <header>Covid Cases</header>
                <div className="card-body">
                  <h3 className="covid-cases">
                    +{numeral(countryInfo.todayCases).format("0,0")}
                  </h3>
                  <span>
                    Total : {numeral(countryInfo.cases).format("0,0")}
                  </span>
                </div>
              </div>
              <div className="card covid-active">
                <header>Active Cases</header>
                <div className="card-body">
                  <h3 className="covid-active">
                    +{numeral(countryInfo.active).format("0,0")}
                  </h3>
                  <span>
                    Total : {numeral(countryInfo.deaths).format("0,0")}
                  </span>
                </div>
              </div>
              <div className="card covid-recovered">
                <header>Recovered</header>
                <div className="card-body">
                  <h3 className="covid-recovered">
                    +{numeral(countryInfo.todayRecovered).format("0,0")}
                  </h3>
                  <span>
                    Total : {numeral(countryInfo.recovered).format("0,0")}
                  </span>
                </div>
              </div>
              <div className="card covid-deaths">
                <header>Deaths</header>
                <div className="card-body">
                  <h3 className="covid-deaths">
                    +{numeral(countryInfo.todayDeaths).format("0,0")}
                  </h3>
                  <span>
                    Total : {numeral(countryInfo.deaths).format("0,0")}
                  </span>
                </div>
              </div>
            </div>

            <div className="container-right">
              <header>Live Cases by Country</header>
              <div className="country-table">
                <Card>
                  <CardContent>
                    <table>
                      <tbody>
                        {countries.map((country) => (
                          <tr key={country.name}>
                            <td className="text-left">
                              <img src={country.flag} alt={country.value} />
                              {country.name}
                            </td>
                            <td className="text-right">
                              {numeral(country.cases).format("0,0")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
