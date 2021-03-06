import {
    Card,
    CardContent,
    FormControl,
    MenuItem,
    Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "../components/InfoBox";
import Map from "../components/Map";
import Table from "../components/Table";
import Head from "next/head";

function App() {
    const [countries, setCountries] = useState(["USA", "Indonesia"]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    setCountries(countries);
                    console.log(countries);
                });
        };

        const getWorldwideData = async () => {
            await fetch("https://disease.sh/v3/covid-19/all")
                .then((response) => response.json())
                .then((data) => {
                    setCountryInfo(data);
                    setTableData(data);
                    console.log(data);
                });
        };
        getCountriesData();
        getWorldwideData();
    }, []);

    const handleCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    };

    return (
        <div className="app">
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            ;
            <div className="app__left">
                <div className="app__header">
                    <h1>Covid 19 Tracker</h1>
                    <FormControl>
                        <Select
                            variant="outlined"
                            onChange={handleCountryChange}
                            value={country}
                        >
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country, index) => (
                                <MenuItem value={country.value} key={index}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox
                        title="Today's New Cases"
                        totalCase={countryInfo.cases}
                        dailyCase={countryInfo.todayCases}
                        casePer1M={countryInfo.casesPerOneMillion}
                    />
                    <InfoBox
                        title="Today's Recovered"
                        totalCase={countryInfo.recovered}
                        dailyCase={countryInfo.todayRecovered}
                        casePer1M={countryInfo.recoveredPerOneMillion}
                    />
                    <InfoBox
                        title="Today's Deaths"
                        totalCase={countryInfo.deaths}
                        dailyCase={countryInfo.todayDeaths}
                        casePer1M={countryInfo.deathPerOneMillion}
                    />
                </div>
                <Map />
            </div>
            <Card className="app__right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    <h3>Worldwide New Cases</h3>
                    {/* Graph */}
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
