import "./Weather.scss";
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Grid, GridItem, Image } from "@chakra-ui/react";
import { purple, red } from "@mui/material/colors";

const Weather = ({ geoLongitude, geoLatitude }) => {
    const [details, setDetails] = useState({});
    const [forecast, setForecast] = useState({});
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [icon, setIcon] = useState("");
    const [localWeather, setLocalWeather] = useState("");
    const [locationName, setLocationName] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    const [temperature, setTemperature] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [currentLatitude, setCurrentLatitude] = useState(geoLatitude);
    const [currentLongitude, setCurrentLongitude] = useState(geoLongitude);
    const [city, setCity] = useState(null);

    const getCities = async (searchTerm) => {
        const url = `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${searchTerm}`;
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
        const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${currentLatitude},${currentLongitude}&aqi=no2`;
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
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${currentLatitude},${currentLongitude}&days=4&aqi=yes&alerts=yes`;
        const res = await fetch(url);
        const dataForecast = await res.json();
        setForecast(dataForecast);
        setWeatherForecast(dataForecast.forecast.forecastday);
    };

    useEffect(() => {
        getLocationDetails();
        getForecast();
    }, [currentLatitude, currentLongitude]);

    return (
        <div className="weather">
            <label>Enter location: </label>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onInputChange={onInputChange}
                value={city}
                onChange={(event, newCity) => {
                    setCity(newCity);
                    setCurrentLatitude(newCity.lat);
                    setCurrentLongitude(newCity.lon);
                }}
                getOptionLabel={(option) => option.name}
                options={cityOptions}
                sx={{ width: 300, border: "#1a237e solid 2px" }}
                renderInput={(params) => (
                    <TextField {...params} label="Type city" sx={{ input: { color: '#e0f7fa' }, label: { color: '#29b6f6', fontSize: "1.5rem" } }} />
                )}
            />
            <h3>Current weather in {locationName}: </h3>
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

            {/* {weatherForecast.map((d) => (
            <Grid templateColumns="repeat(6, 1fr)" gap={6} key={d.date}>
                <GridItem w="100%" h="10" bg="blue.500">{d.date}</GridItem>
                <GridItem w="100%" h="10" bg="blue.500">{d.day.condition.text}</GridItem>
                <GridItem w="100%" h="10" bg="blue.500">{d.day.avgtemp_c}&#176;C</GridItem>
                <GridItem w="100%" h="10" bg="blue.500"><Image src={d.day.condition.icon} fallbackSrc="icon" /></GridItem>
                <GridItem w="100%" h="10" bg="blue.500">{d.astro.sunrise}</GridItem>
				<GridItem w="100%" h="10" bg="blue.500">{d.astro.sunset}</GridItem>
            </Grid>
			))} */}
        </div>
    );
};

export default Weather;
