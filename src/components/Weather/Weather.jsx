import "./Weather.scss";
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const Weather = ({ longitude, latitude }) => {
    const [details, setDetails] = useState({});
    const [forecast, setForecast] = useState({});
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [icon, setIcon] = useState("");
    const [localWeather, setLocalWeather] = useState("");
    const [locationName, setLocationName] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    const [temperature, setTemperature] = useState("");
    const [cityOptions, setCityOptions] = useState([]);

    // const [search, setSearch] = useState("");
    // const [searchImg, setSearchImg] = useState("url");
    const [city, setCity] = useState(null);

    const getCities = async (searchTerm) => {
        const url = `http://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${searchTerm}`;
        const res = await fetch(url);
        const searchResults = await res.json();
        setCityOptions(searchResults);
    };
    const onInputChange = async (event, value, reason) => {
        if (value) {
            await getCities(value);
        } else {
            setCityOptions([]);
        }
    };

    const getLocationDetails = async () => {
        const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${latitude},${longitude}&aqi=no2`;
        const res = await fetch(url);
        const data = await res.json();
        setDetails(data);
        setLocalWeather(data.current.condition.text);
        setIcon(data.current.condition.icon);
        setLocationName(data.location.name);
        setLastUpdated(data.current.last_updated);
        setTemperature(data.current.temp_c);
    };

    const getForecast = async () => {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${latitude},${longitude}&days=4&aqi=yes&alerts=yes`;
        const res = await fetch(url);
        const dataForecast = await res.json();
        setForecast(dataForecast);
        setWeatherForecast(dataForecast.forecast.forecastday);
    };

    // const getSearchForecast = async (location) => {
    //     const url = `http://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${location.latitude},${location.longitude}`;
    //     const res = await fetch(url);
    //     const dataSearch = await res.json();
    //     // setForecast(dataSearch);
    //     setSearch(dataSearch.name);
    //     // setSearchImg(dataSearch.url);
    // };

    useEffect(() => {
        getLocationDetails();
        getForecast();
    }, [latitude, longitude]);

    return (
        <div>
            <form>
                <label>Enter location: </label>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onInputChange={onInputChange}
                    value={city}
                    onChange={(event, newCity) => {
                        setCity(newCity);
						latitude = newCity.lat;
						longitude = newCity.lon;
                    }}
                    getOptionLabel={(option) => option.name}
                    options={cityOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="City" />
                    )}
                />
                {/* <button onClick={(e) => setLocationName({ city })}>
                    search
                </button> */}
            </form>
            {/* {!city || city == "" ? (
                <h3>Current weather in {locationName}: </h3>
            ) : (
                <h3>Current weather in {city}: </h3>
            )} */}
            <div className="current-weather">
                <img src={icon} alt="icon" />
                <p>{temperature}&#176;C</p>
                <p>{localWeather}</p>
                <p>{lastUpdated}</p>
            </div>
            <div className="forecast">
                {weatherForecast.map((d) => (
                    <div key={d.date} className="forecast-day">
                        <div className="forecast-item">{d.date}</div>
                        <div className="forecast-item">
                            {d.day.condition.text}
                        </div>
                        <div className="forecast-item">
                            {d.day.avgtemp_c}&#176;C
                        </div>
                        <div className="forecast-item">
                            <img src={d.day.condition.icon} alt="icon" />
                        </div>
                        <div className="forecast-item">
                            sunrise time: {d.astro.sunrise}
                        </div>
                        <div className="forecast-item">
                            sunset time: {d.astro.sunset}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weather;

{
    /* <li key={d.date}>{d.date} {d.day.maxtemp_c} {d.day.mintemp_c}</li> */
}
