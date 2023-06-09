import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { observer, useObserver } from "mobx-react";

import api from "../../api/api";
import { useMainStore } from "../../stores/MainContext";
import { parseURLLocation } from "../../utils";

import ForecastList from "../Forecast/Forecast";
import Weather from "../Weather/Weather";
import { getOneDayWeather } from "../../helper";
import DayForecast from "../DayForecast/DayForecast";
import SunMoving from "../SunMoving/SunMoving";
import { WeatherData } from "../../interfaces";
import { IMainStore } from "../../stores/mainStore";

const INTERVAL_OF_DATA_REQUEST = 300000;

function Layout() {
    const [isLoad, setLoading] = useState<Boolean>(false);
    const mainStore: IMainStore = useMainStore();
    const { location } = useParams();
    const parsedLocation = parseURLLocation(location);
    let { state } = useLocation();
    let defaultCity: string = "Saint Petersburg";

    useEffect(() => {
        const interval = setInterval(getData, INTERVAL_OF_DATA_REQUEST);
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
        } 

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        defaultCity = mainStore.city;
        getData();
    }, [mainStore.city]);

    function getData() {
        if (state && state.linkedCity) {
            if (mainStore.savedLocations.length) {
                const savedCity = mainStore.savedLocations.find((city: WeatherData) => city.name === state.linkedCity);
                if (savedCity) {
                    mainStore.setSelectedCityData(savedCity);
                    setLoading(true);
                    return;
                }
            }
        }

        getOneDayWeather({
            success: (res) => {
                mainStore.setSelectedCityData(res);
                setLoading(true);
            },
            fail: () => {
                console.log("City not found");
                mainStore.setCity(defaultCity);
            }, 
            city: mainStore.city,
        });
    }

    return useObserver(() => (
        <>
            {isLoad ? (
                <>
                    <Weather />
                    <DayForecast />
                    <SunMoving />
                    <ForecastList />
                </>
            ) : (
                <p>Load data...</p>
            )}
        </>
    ));
}

export default observer(Layout);
