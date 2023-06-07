import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import ForecastList from "../Forecast/Forecast";
import Weather from "../Weather/Weather";
import api from "../../api/api";
import { WeatherData } from "../../interfaces";


export default function Layout() {
    let defaultCity: string = 'Saint Petersburg';
    const [data, setData] = useState<WeatherData>({} as WeatherData);
    const [isLoad, setLoading] = useState<Boolean>(false);
    const [city, setCity] = useState<string>(defaultCity);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (e) => {
            const { latitude, longitude } = e.coords;

            api.getCityByCoord(latitude, longitude)
                .then(res => {
                    setCity(res.name);
                    setData(res);
                    setLoading(true);
                })
                .catch(() => getData());
        },
        () => getData());
    }, []);

    useEffect(getData, [city]);

    function getData() {
        api.getOneDayWeather(city)
            .then(res => {
                setData(res);
                setLoading(true);
            })
            .catch(err => {
                alert("City not found");
                setCity(defaultCity);
            });
    }

    function changeCity(newCity: string) {
        defaultCity = city;
        setCity(newCity);
    }

    return (
        <>
            <Header 
                name={city}
                changeCity={changeCity} />
            {isLoad ? <>
                <Weather data={data} />
                <ForecastList coord={data.coord} />
            </>  : <p>Load data...</p>}
        </>
    )
}