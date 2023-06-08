import React, { useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";

import api from "../../api/api";
import { WeatherData } from "../../interfaces";
import { useMainStore } from "../../stores/MainContext";

import Header from "../Header/Header";
import ForecastList from "../Forecast/Forecast";
import Weather from "../Weather/Weather";


function Layout() {
    const [data, setData] = useState<WeatherData>({} as WeatherData);
    const [isLoad, setLoading] = useState<Boolean>(false);
    const mainStore = useMainStore();
    let defaultCity: string = "Saint Petersburg";

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (e) => {
                const { latitude, longitude } = e.coords;

                api.getCityByCoord(latitude, longitude)
                    .then((res) => {
                        mainStore.setCity(res.name);
                        setData(res);
                        setLoading(true);
                    })
                    .catch(() => getData());
            },
            () => getData()
        );
    }, []);

    useEffect(getData, [mainStore.city]);

    function getData() {
        api.getOneDayWeather(mainStore.city)
            .then((res) => {
                setData(res);
                setLoading(true);
            })
            .catch((err) => {
                alert("City not found");
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
