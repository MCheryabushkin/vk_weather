import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer, useObserver } from "mobx-react";

import api from "../../api/api";
import { WeatherData } from "../../interfaces";
import { useMainStore } from "../../stores/MainContext";
import { parseLocation } from "../../utils";

import Header from "../Header/Header";
import ForecastList from "../Forecast/Forecast";
import Weather from "../Weather/Weather";


function Layout() {
    const [data, setData] = useState<WeatherData>({} as WeatherData);
    const [isLoad, setLoading] = useState<Boolean>(false);
    const mainStore = useMainStore();
    const { location } = useParams();
    const parsedLocation = parseLocation(location);
    let defaultCity: string = "Saint Petersburg";

    useEffect(() => {
        if (parsedLocation) {
            if (typeof parsedLocation === 'string') {
                mainStore.setCity(location);
            } else {
                const { lat, lon } = parsedLocation;
                const cityByCoord = async () => {
                    const data = await api.getCityByCoord(lat, lon);
                    return data;
                }
                cityByCoord()
                    .then(data => {
                        mainStore.setCity(data.name);
                    })
                    .catch(() => console.log("City not found"))
            }
        } else {
            navigator.geolocation.getCurrentPosition(
                async (e) => {
                    const { latitude, longitude } = e.coords;
    
                    await api.getCityByCoord(latitude, longitude)
                        .then((res) => {
                            mainStore.setCity(res.name);
                            setData(res);
                            setLoading(true);
                        })
                }
            );
        }

    }, []);

    useEffect(getData, [mainStore.city]);

    function getData() {
        api.getOneDayWeather(mainStore.city)
            .then((res) => {
                setData(res);
                setLoading(true);
            })
            .catch((err) => {
                console.log("City not found");
                mainStore.setCity(defaultCity);
            });
    }

    function changeCity(newCity: string) {
        defaultCity = mainStore.city;
        mainStore.setCity(newCity);
    }

    return useObserver(() => (
        <>
            <Header changeCity={changeCity} />
            {isLoad ? (
                <>
                    <Weather data={data} />
                    <ForecastList coord={data.coord} />
                </>
            ) : (
                <p>Load data...</p>
            )}
        </>
    ));
}

export default observer(Layout);
